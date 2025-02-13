import { describe, it, expect, jest } from '@jest/globals';

// Mock Firebase modules
const mockAuth = {
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({
    setCustomParameters: jest.fn()
  })),
  signInWithPopup: jest.fn()
};

const mockFirestore = {
  doc: jest.fn()
};

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  auth: jest.fn(() => mockAuth),
  firestore: jest.fn(() => mockFirestore)
}));

jest.mock('firebase/firestore', () => ({}));
jest.mock('firebase/auth', () => ({}));

// Import the module under test
import firebase, { createUserProfileDocument, auth, firestore, signInWithGoogle } from '../../src/firebase/firebase.utils';

describe('Firebase Utils', () => {
  describe('createUserProfileDocument', () => {
    it('should return early if userAuth is falsy', async () => {
      const result = await createUserProfileDocument(null);
      expect(result).toBeUndefined();
    });

    it('should create a new user document if it does not exist', async () => {
      const mockUserAuth = {
        uid: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      };
      const mockAdditionalData = { role: 'user' };

      const mockGet = jest.fn().mockResolvedValue({ exists: false });
      const mockSet = jest.fn().mockResolvedValue();
      const mockUserRef = {
        get: mockGet,
        set: mockSet
      };

      mockFirestore.doc.mockReturnValue(mockUserRef);

      const result = await createUserProfileDocument(mockUserAuth, mockAdditionalData);

      expect(mockFirestore.doc).toHaveBeenCalledWith(`users/${mockUserAuth.uid}`);
      expect(mockGet).toHaveBeenCalled();
      expect(mockSet).toHaveBeenCalledWith({
        displayName: mockUserAuth.displayName,
        email: mockUserAuth.email,
        createdAt: expect.any(Date),
        role: 'user'
      });
      expect(result).toBe(mockUserRef);
    });

    it('should not create a new user document if it already exists', async () => {
      const mockUserAuth = {
        uid: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      };

      const mockGet = jest.fn().mockResolvedValue({ exists: true });
      const mockSet = jest.fn().mockResolvedValue();
      const mockUserRef = {
        get: mockGet,
        set: mockSet
      };

      mockFirestore.doc.mockReturnValue(mockUserRef);

      const result = await createUserProfileDocument(mockUserAuth);

      expect(mockFirestore.doc).toHaveBeenCalledWith(`users/${mockUserAuth.uid}`);
      expect(mockGet).toHaveBeenCalled();
      expect(mockSet).not.toHaveBeenCalled();
      expect(result).toBe(mockUserRef);
    });

    it('should handle errors when creating a user document', async () => {
      const mockUserAuth = {
        uid: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      };

      const mockGet = jest.fn().mockResolvedValue({ exists: false });
      const mockSet = jest.fn().mockRejectedValue(new Error('Database error'));
      const mockUserRef = {
        get: mockGet,
        set: mockSet
      };

      mockFirestore.doc.mockReturnValue(mockUserRef);

      console.log = jest.fn();

      await createUserProfileDocument(mockUserAuth);

      expect(console.log).toHaveBeenCalledWith('error creating user', 'Database error');
    });
  });

  describe('signInWithGoogle', () => {
    it('should call auth.signInWithPopup with Google provider', () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      signInWithGoogle();

      expect(mockAuth.signInWithPopup).toHaveBeenCalledWith(provider);
    });
  });
});