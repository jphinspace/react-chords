import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { guitarInstrument } from './chordCatalog';

test('renders the generated guitar chord browser', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Chords Database')).toBeInTheDocument();
  expect(screen.getAllByText('Guitar').length).toBeGreaterThan(0);
  expect(guitarInstrument.tunings.standard).toEqual(['E', 'A', 'D', 'G', 'B', 'E']);
});
