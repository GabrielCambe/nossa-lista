import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc as deleteFirestoreDoc,
  addDoc,
  DocumentData,
  QueryConstraint,
} from "firebase/firestore";
import { MoviesByCategoryType, MovieType } from "@/lib/types";

// Existing functions
export async function getMoviesByCategory(): Promise<MoviesByCategoryType> {
  const moviesRef = collection(db, "movies");
  const snapshot = await getDocs(moviesRef);
  const movies: MovieType[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<MovieType, 'id'>)
  }));

  const moviesByCategory: MoviesByCategoryType = movies.reduce((acc, movie) => {
    const category = movie.genre;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(movie);
    return acc;
  }, {} as MoviesByCategoryType);

  console.log(moviesByCategory);
  return moviesByCategory;
}

export async function upsertUser(email: string, name: string, photoUrl: string): Promise<void> {
  const userRef = doc(db, "users", email);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // Update existing user
    await updateDoc(userRef, {
      name,
      photoUrl
    });
  } else {
    // Create new user
    await setDoc(userRef, {
      name,
      photoUrl,
      email
    });
  }
}

// General CRUD Functions

/**
 * Create a new document in a specified collection.
 * @param collectionName - Name of the Firestore collection.
 * @param data - Data to be added to the collection.
 * @returns The ID of the created document.
 */
export async function createDocument<T extends DocumentData>(collectionName: string, data: T): Promise<string> {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

/**
 * Retrieve a document by its ID from a specified collection.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - ID of the document to retrieve.
 * @returns The document data or null if not found.
 */
export async function getDocument<T extends DocumentData>(collectionName: string, docId: string): Promise<T | null> {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as T;
  }
  return null;
}

/**
 * Retrieve all documents from a specified collection with optional query constraints.
 * @param collectionName - Name of the Firestore collection.
 * @param constraints - Firestore query constraints (e.g., where, orderBy).
 * @returns An array of documents matching the query.
 */
export async function getCollection<T extends DocumentData>(collectionName: string, ...constraints: QueryConstraint[]): Promise<(T & { id: string })[]> {
  const colRef = collection(db, collectionName);
  const q = query(colRef, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as (T & { id: string })[];
}

/**
 * Update an existing document in a specified collection.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - ID of the document to update.
 * @param data - Partial data to update the document with.
 */
export async function updateDocument<T extends DocumentData>(collectionName: string, docId: string, data: T): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
}

/**
 * Delete a document by its ID from a specified collection.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - ID of the document to delete.
 */
export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await deleteFirestoreDoc(docRef);
}