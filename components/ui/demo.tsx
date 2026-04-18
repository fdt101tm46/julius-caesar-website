// demo.tsx — shows how to use both components

// ── Original StaggerTestimonials (unchanged) ─────────────────
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export const DemoTestimonials = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <StaggerTestimonials />
    </div>
  );
};

// ── Caesar Gallery (adapted for Julius Caesar homepage) ───────
import { CaesarGallery } from "@/components/ui/caesar-gallery";

export const DemoGallery = () => {
  return (
    <div className="w-full">
      <CaesarGallery />
    </div>
  );
};
