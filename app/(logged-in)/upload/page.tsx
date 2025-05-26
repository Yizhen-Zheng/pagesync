import BgGradient from "@/components/common/bg-gradient";
import UploadHeader from "@/components/upload/upload-hearder";
import UploadForm from "@/components/upload/upload-form";
export default function Page() {
  return (
    <section className="min-h-screen">
      <BgGradient className="" />
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8  ">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
}
