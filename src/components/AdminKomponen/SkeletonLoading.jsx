import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const SkeletonLoading = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Card>
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-12">
            <div className="space-y-2">
              <Skeleton className="h-9 w-80" />
              <Skeleton className="h-5 w-96" />
            </div>
          </div>

          <div className="flex flex-col gap-16">
            <div>
              <div className="flex gap-2 border-b-1 border-gray-300 pb-3 mb-7">
                <Skeleton className="h-6 w-7" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="grid gap-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid gap-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 border-b-1 border-gray-300 pb-3 mb-7">
                <Skeleton className="h-6 w-7" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <div className="grid gap-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid gap-3">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <div className="grid gap-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid gap-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-24 w-full" />
                </div>

                <div className="grid gap-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-24 w-full" />
                </div>

                <div className="grid gap-3">
                  <Skeleton className="h-5 w-56" />
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl">
                    <Skeleton className="h-10 w-10 rounded mb-2" />
                    <Skeleton className="h-5 w-64 mb-1" />
                    <Skeleton className="h-4 w-48 mb-4" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 border-b-1 border-gray-300 pb-3 mb-7">
                <Skeleton className="h-6 w-7" />
                <Skeleton className="h-6 w-56" />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="grid gap-3">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid gap-3">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end gap-2">
              <Skeleton className="h-10 md:w-1/6 w-full" />
              <Skeleton className="h-10 md:w-1/6 w-full" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SkeletonLoading;
