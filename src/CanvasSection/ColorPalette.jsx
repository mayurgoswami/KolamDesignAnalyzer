const DEFAULT_COLORS = [
  { key: 'maroon', value: '#7A2F2F' },
  { key: 'turmeric', value: '#D6A400' },
  { key: 'indigo', value: '#3B4C9B' },
  { key: 'cream', value: '#F7F2EA' },
  { key: 'sand', value: '#E9DFC9' },
]

import styles from './CanvasSection.module.css';

const ColorPalette = ({ value, onChange }) => {
  return (
    <div className={styles.colorPalette}>
      {DEFAULT_COLORS.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.value)}
          className={
            value === c.value
              ? `${styles.colorSwatch} ${styles.colorSwatchActive}`
              : styles.colorSwatch
          }
          style={{ backgroundColor: c.value }}
          aria-label={`Choose ${c.key} color`}
        />
      ))}
    </div>
  )
}

export default ColorPalette;