// app/page.tsx — Example of how to drop CaesarGallery into the homepage
// Replace your gallery section in index.html with this component when migrating to Next.js

import { CaesarGallery } from "@/components/ui/caesar-gallery";

export default function HomePage() {
  return (
    <main>
      {/* ... other homepage sections (Hero, About, Achievements, Blog) ... */}

      {/* Gallery section — replaces the static gallery grid from index.html */}
      <CaesarGallery />

      {/* ... Footer ... */}
    </main>
  );
}
