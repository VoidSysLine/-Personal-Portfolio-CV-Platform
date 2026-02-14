import { useState, useCallback } from 'react';

interface PdfViewerState {
  isOpen: boolean;
  currentPdf: string | null;
  currentPage: number;
  totalPages: number;
}

export function usePdfViewer() {
  const [state, setState] = useState<PdfViewerState>({
    isOpen: false,
    currentPdf: null,
    currentPage: 1,
    totalPages: 0,
  });

  const openPdf = useCallback((pdfPath: string) => {
    setState({ isOpen: true, currentPdf: pdfPath, currentPage: 1, totalPages: 0 });
  }, []);

  const closePdf = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false, currentPdf: null, currentPage: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const setTotalPages = useCallback((total: number) => {
    setState(prev => ({ ...prev, totalPages: total }));
  }, []);

  const nextPage = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, prev.totalPages),
    }));
  }, []);

  const prevPage = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1),
    }));
  }, []);

  return {
    ...state,
    openPdf,
    closePdf,
    setPage,
    setTotalPages,
    nextPage,
    prevPage,
  };
}
