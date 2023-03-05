import React from 'react';

const AuthContext = React.createContext({});

export function AuthProvider (props: Record<string, unknown>) {

  const value = React.useMemo(
    () => ({
      user: null,
    }),
    []
  );
  return <AuthContext.Provider value={value} {...props} />;
}; 


export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context)
    throw new Error('useAuth must be used within a AuthProvider');
  return context;
};