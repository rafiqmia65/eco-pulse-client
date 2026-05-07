import { MessageCircle } from "lucide-react";
import Link from "next/link";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";

export default function StillHaveQuestions() {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-10 text-center lg:sticky lg:top-24 h-fit">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
        <MessageCircle className="text-white w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
      <p className="text-muted-foreground mb-8 text-sm max-w-sm mx-auto">
        Our support team and community moderators are here to help you 24/7. Get
        in touch with us for more specific inquiries.
      </p>
      <div className="flex flex-col gap-4">
        <Link href="/contact" className="w-full">
          <CustomButton className="w-full font-bold">
            Contact Support
          </CustomButton>
        </Link>
        <Link href="/blog" className="w-full">
          <CustomButton variant="outline" className="w-full font-bold">
            Read our Guide
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}
