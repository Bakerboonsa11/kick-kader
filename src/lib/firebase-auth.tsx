import { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  UserCredential,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  email: string;
  fullName: string;
  age: number;
  position: string;
  experienceYears: number;
  role: "admin" | "player";
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, age: number, position: string, experienceYears: number) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state persistence
    const setAuthPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Error setting auth persistence:", error);
      }
    };

    setAuthPersistence();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser?.email);
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            console.log("User data loaded:", userData);
            setUserData(userData);
          } else {
            console.log("No user data found in Firestore");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error",
            description: "Failed to load user data.",
            variant: "destructive",
          });
          setUserData(null);
        }
      } else {
        console.log("No user signed in");
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const signUp = async (email: string, password: string, fullName: string, age: number, position: string, experienceYears: number) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Default role is 'player', you can change this based on your requirements
      const userData: UserData = {
        email,
        fullName,
        age,
        position,
        experienceYears,
        role: 'player'
      };

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), userData);
      setUserData(userData);
      
      return { error: null };
    } catch (error: any) {
      console.error("Sign up error:", error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user.email);
      return { error: null };
    } catch (error: any) {
      console.error("Sign in error:", error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserData(null);
      // Clear any stored tokens or auth state
      localStorage.removeItem('firebaseAuthToken');
      console.log("User signed out");
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        // User is signed in
        const token = await user.getIdToken();
        localStorage.setItem('firebaseAuthToken', token);
      } else {
        // User is signed out
        localStorage.removeItem('firebaseAuthToken');
      }
    });

    // Refresh token every hour
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.getIdToken(true);
      }
    }, 60 * 60 * 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const value = {
    user,
    userData,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
