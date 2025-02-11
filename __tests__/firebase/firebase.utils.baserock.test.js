import { jest } from '@jest/globals';
import * as firebaseUtils from '../../src/firebase/firebase.utils.js';

// Mock Firebase
jest.mock('firebase/app', () => {
  const authMock = {
    GoogleAuthProvider: jest.fn(() => ({
      setCustomParameters: jest.fn()
    })),
    signInWithPopup: jest.fn()
  };
  const firestoreMock = {
    doc: jest.fn()
  };
  return {
    __esModule: true,
    default: {
      initializeApp: jest.fn(),
      auth: jest.fn(() => authMock),
      firestore: jest.fn(() => firestoreMock)
    }
  };
});

jest.mock('firebase/firestore', () => ({}));
jest.mock('firebase/auth', () => ({}));

describe('Firebase Utils', () => {
  let mockFirestore;
  let mockAuth;
  let mockUserRef;

  beforeEach(() => {
    mockUserRef = {
      get: jest.fn(),
      set: jest.fn()
    };
    mockFirestore = {
      doc: jest.fn().mockReturnValue(mockUserRef)
    };
    mockAuth = {
      signInWithPopup: jest.fn()
    };

    firebaseUtils.firestore.doc = mockFirestore.doc;
    firebaseUtils.auth.signInWithPopup = mockAuth.signInWithPopup;

    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserProfileDocument', () => {
    it('should return early if userAuth is falsy', async () => {
      const result = await firebaseUtils.createUserProfileDocument(null);
      expect(result).toBeUndefined();
    });

    it('should create a new user document if it does not exist', async () => {
      const userAuth = {
        uid: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      };
      const additionalData = { role: 'user' };

      mockUserRef.get.mockResolvedValue({ exists: false });

      const result = await firebaseUtils.createUserProfileDocument(userAuth, additionalData);

      expect(mockFirestore.doc).toHaveBeenCalledWith('users/123');
      expect(mockUserRef.set).toHaveBeenCalledWith({
        displayName: 'Test User',
        email: 'test@example.com',
        createdAt: expect.any(Date),
        role: 'user'
      });
      expect(result).toBe(mockUserRef);
    });

    it('should not create a new user document if it already exists', async () => {
      const userAuth = {
        uid: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      };

      mockUserRef.get.mockResolvedValue({ exists: true });

      const result = await firebaseUtils.createUserProfileDocument(userAuth);

      expect(mockFirestore.doc).toHaveBeenCalledWith('users/123');
      expect(mockUserRef.set).not.toHaveBeenCalled();
      expect(result).toBe(mockUserRef);
    });

    it('should log an error if creating user fails', async () => {
      const userAuth = {
        uid: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      };

      mockUserRef.get.mockResolvedValue({ exists: false });
      mockUserRef.set.mockRejectedValue(new Error('Failed to create user'));

      await firebaseUtils.createUserProfileDocument(userAuth);

      expect(console.log).toHaveBeenCalledWith('error creating user', 'Failed to create user');
    });
  });

  describe('signInWithGoogle', () => {
    it('should call auth.signInWithPopup with Google provider', () => {
      firebaseUtils.signInWithGoogle();
      expect(mockAuth.signInWithPopup).toHaveBeenCalled();
    });
  });
});