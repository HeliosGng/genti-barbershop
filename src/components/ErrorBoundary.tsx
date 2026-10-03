import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Scissors, RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Genti's Barbershop caught an error:", error, errorInfo);
  }

  private handleReload = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('genti_gallery_photos');
      }
    } catch (e) {
      // Ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0d11] text-[#f4f3ee] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#181d2a] border border-[#2d3548] flex items-center justify-center text-[#dfa938] mb-6 shadow-xl">
            <Scissors className="w-8 h-8 rotate-45 text-[#dfa938]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-brand mb-2 text-white">
            GENTI'S BARBERSHOP
          </h1>
          <p className="text-sm text-[#a0a6b5] max-w-md mb-6 leading-relaxed">
            Një problem i vogël u has gjatë ngarkimit të faqes. Klikoni butonin më poshtë për ta rifreskuar.
            <br />
            <span className="text-xs text-[#71798c]">
              (A temporary glitch occurred while loading. Please tap reload.)
            </span>
          </p>

          <button
            onClick={this.handleReload}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#dfa938] hover:bg-[#eab949] text-black font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Rifresko Faqen / Reload Page</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
