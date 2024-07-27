// 인증 '상태' 앱전체에 공유하는 함수

import React, {createContext, useState, useEffect} from 'react';
import {authorizeGoogleFit} from './googleFitService'; // 올바른 경로로 수정하세요

export const GoogleFitContext = createContext();

export const GoogleFitProvider = ({children}) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeGoogleFit = async () => {
      try {
        const result = await authorizeGoogleFit();
        setAuthorized(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeGoogleFit();
  }, []);

  return (
    <GoogleFitContext.Provider value={{authorized, loading, error}}>
      {children}
    </GoogleFitContext.Provider>
  );
};
