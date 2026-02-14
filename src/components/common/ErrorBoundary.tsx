import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8 text-center">
          <AlertTriangle size={48} style={{ color: 'var(--color-error)' }} />
          <h3
            className="text-xl font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Etwas ist schiefgelaufen
          </h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Ein unerwarteter Fehler ist aufgetreten.
          </p>
          <Button onClick={this.handleReset} variant="outline">
            Erneut versuchen
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
