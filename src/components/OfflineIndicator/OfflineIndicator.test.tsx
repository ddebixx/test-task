import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { OfflineIndicator } from './OfflineIndicator';

describe('OfflineIndicator', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { onLine: true });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should not render when online', () => {
    render(<OfflineIndicator />);
    expect(screen.queryByText(/you are offline/i)).not.toBeInTheDocument();
  });

  it('should render banner when offline', async () => {
    vi.stubGlobal('navigator', { onLine: false });

    render(<OfflineIndicator />);

    window.dispatchEvent(new Event('offline'));

    await waitFor(() => {
      expect(screen.getByText(/you are offline/i)).toBeInTheDocument();
    });
  });

  it('should show cached data message', async () => {
    vi.stubGlobal('navigator', { onLine: false });

    render(<OfflineIndicator />);

    window.dispatchEvent(new Event('offline'));

    await waitFor(() => {
      expect(screen.getByText(/using cached data/i)).toBeInTheDocument();
    });
  });

  it('should hide banner when coming back online', async () => {
    vi.stubGlobal('navigator', { onLine: false });

    const { rerender } = render(<OfflineIndicator />);

    window.dispatchEvent(new Event('offline'));

    await waitFor(() => {
      expect(screen.getByText(/you are offline/i)).toBeInTheDocument();
    });

    vi.stubGlobal('navigator', { onLine: true });
    rerender(<OfflineIndicator />);
    window.dispatchEvent(new Event('online'));

    await waitFor(() => {
      expect(screen.queryByText(/you are offline/i)).not.toBeInTheDocument();
    });
  });
});
