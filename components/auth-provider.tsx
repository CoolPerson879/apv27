"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

interface User {
  id: string;
  email: string;
  name: string | null;
  is_moderator: boolean; // Re-added for moderator feature
}

interface AuthResult {
  success: boolean;
  error: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<AuthResult>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseClient();

  // Helper function to fetch user profile data
  const fetchUserProfile = async (
    userId: string
  ): Promise<{ name: string | null; is_moderator: boolean }> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("name, is_moderator")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching user profile:", error.message);
      return { name: null, is_moderator: false };
    }

    if (!data) {
      return { name: null, is_moderator: false };
    }

    const userName = typeof data.name === "string" ? data.name : null;
    const userIsModerator =
      typeof data.is_moderator === "boolean" ? data.is_moderator : false;

    return { name: userName, is_moderator: userIsModerator };
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      if (session) {
        const profile = await fetchUserProfile(session.user.id);
        setUser({
          id: session.user.id,
          email: session.user.email || "N/A",
          name: profile.name,
          is_moderator: profile.is_moderator,
        });
      } else {
        setUser(null);
      }
      setLoading(false); // Always set loading to false after auth state change processing
    });

    // Check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const profile = await fetchUserProfile(session.user.id);
        setUser({
          id: session.user.id,
          email: session.user.email || "N/A",
          name: profile.name,
          is_moderator: profile.is_moderator,
        });
      }
      setLoading(false); // Always set loading to false after initial session check
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      console.error("Supabase login error:", error.message);
      return { success: false, error: error.message };
    } else if (!data.user) {
      // This case happens if email confirmation is enabled and user hasn't confirmed
      return {
        success: false,
        error: "Please check your email to confirm your account.",
      };
    } else {
      console.log("Supabase login success:", data.user?.email);
      // After successful login, fetch profile data
      const profile = await fetchUserProfile(data.user.id);
      setUser({
        id: data.user.id,
        email: data.user.email || "N/A",
        name: profile.name,
        is_moderator: profile.is_moderator,
      });
      return { success: true, error: null };
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResult> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // Store name in user metadata (this is for auth.users, not profiles)
      },
    });
    setLoading(false);

    if (error) {
      console.error("Supabase registration error:", error.message);
      return { success: false, error: error.message };
    } else if (!data.user) {
      // This case happens if email confirmation is enabled and user hasn't confirmed
      console.warn(
        "User signed up but data.user is null, likely due to email confirmation being required."
      );
      return {
        success: false,
        error:
          "Registration successful! Please check your email to confirm your account.",
      };
    } else {
      console.log("Supabase registration success:", data.user?.email);
      // Insert into profiles table after successful auth.users creation
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        name: name,
        is_moderator: false, // Default to false for new registrations
      });

      if (profileError) {
        console.error("Error inserting profile data:", profileError); // Log the full error object
        // Even if profile insertion fails, the user account is created in auth.users
        return {
          success: true,
          error: `Account created, but profile data could not be saved: ${
            profileError.message || "Unknown error"
          }. Please contact support.`,
        };
      }

      setUser({
        id: data.user.id,
        email: data.user.email || "N/A",
        name: name,
        is_moderator: false,
      });
      return { success: true, error: null };
    }
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase logout error:", error.message);
    } else {
      console.log("Supabase logout success");
    }
    if (!error) {
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
