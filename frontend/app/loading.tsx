import BrandLoader from "@/components/BrandLoader";

export default function Loading() {
  return (
    <div className="route-loading-fallback">
      <BrandLoader
        className="brand-loader--fallback"
        label="AntenaPRO učitava stranicu"
        announce
      />
    </div>
  );
}
