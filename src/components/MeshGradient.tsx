type Variant =
  | 'cream'
  | 'warm'
  | 'sand'
  | 'dark'
  | 'dark-cream'
  | 'dark-orange'
  | 'dark-deep';

/**
 * Animated mesh-gradient backdrop using brand palette.
 *
 * Default: `absolute inset-0` — fills its `relative overflow-hidden` parent.
 * `fixed` mode: `fixed inset-0 -z-10` — viewport-size, page-wide background.
 *
 * Variants:
 *  - cream: soft cream wash — for content sections
 *  - warm: orange + cream — for accent / focal sections
 *  - dark: charcoal + orange glow — for dramatic dark sections
 */
export default function MeshGradient({
  variant = 'cream',
  className = '',
  fixed = false,
}: {
  variant?: Variant;
  className?: string;
  fixed?: boolean;
}) {
  const positioning = fixed
    ? 'fixed inset-0 -z-10'
    : 'absolute inset-0';
  return (
    <div
      aria-hidden='true'
      className={`${positioning} overflow-hidden pointer-events-none mesh-gradient mesh-gradient--${variant} ${className}`}
    >
      <div className='mesh-blob mesh-blob-1' />
      <div className='mesh-blob mesh-blob-2' />
      <div className='mesh-blob mesh-blob-3' />
    </div>
  );
}
