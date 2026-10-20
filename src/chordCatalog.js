import catalog from '../.generated/catalog.json';

const guitarTuning = catalog.tunings.find(tuning => tuning.id === 'guitar-6-e-standard');
const guitar = catalog.instruments.find(instrument => instrument.id === 'guitar-6');
const chordsById = Object.fromEntries(catalog.chords.map(chord => [chord.id, chord]));

const rootToKey = root => root
  .replace('♯', 'sharp')
  .replace('♭', 'flat');

const structureToSuffix = structureId => structureId === 'major' ? 'major' : '5';

const toDiagramPosition = chordShape => {
  const derived = catalog.derivedNotes[chordShape.id];
  const position = chordShape.position;

  return {
    frets: derived.frets.slice().reverse().map(fret => {
      if (fret === null) return -1;
      if (fret === 0) return 0;
      return position === 0 ? fret : fret - position + 1;
    }),
    midi: derived.notes.slice().reverse().filter(note => note !== null).map(note => note.midi),
    baseFret: Math.max(1, position)
  };
};

const chords = catalog.chordShapes
  .filter(chordShape => chordShape.tuningId === guitarTuning.id)
  .reduce((byKey, chordShape) => {
    const chord = chordsById[chordShape.chordId];
    const key = rootToKey(chord.root);
    const suffix = structureToSuffix(chord.structureId);
    const entries = byKey[key] || [];
    let entry = entries.find(item => item.key === key && item.suffix === suffix);

    if (!entry) {
      entry = { key, suffix, positions: [] };
      entries.push(entry);
    }

    entry.positions.push(toDiagramPosition(chordShape));
    byKey[key] = entries;
    return byKey;
  }, {});

export const guitarChords = { chords };

export const guitarInstrument = {
  strings: guitar.stringCount,
  fretsOnChord: 4,
  name: 'Guitar',
  keys: [],
  tunings: {
    standard: guitarTuning.openStrings.slice().reverse().map(string => string.spelling)
  }
};
