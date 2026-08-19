const fs = require('fs');
const svg = fs.readFileSync('public/exhibit-26.svg', 'utf8');
const tsx = `import React, { forwardRef } from 'react';

export const WordmarkSVG = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  ${svg.replace(/<\?xml[^>]*>/, '').replace(/fill="#FBFBFB"/g, 'fill="currentColor" className="wordmark-path"').replace(/<svg /, '<svg ref={ref} {...props} ')}
));
WordmarkSVG.displayName = 'WordmarkSVG';`;

if (!fs.existsSync('src/components')) {
  fs.mkdirSync('src/components');
}
fs.writeFileSync('src/components/WordmarkSVG.tsx', tsx);
