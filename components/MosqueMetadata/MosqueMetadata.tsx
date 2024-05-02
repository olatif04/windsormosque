import { MosqueMetadataType } from "@/types/MosqueDataType"

export default function MosqueMetadata({
  metadata,
}: {
  metadata: MosqueMetadataType
}) {
  return (
    <div className="md:flex text-white text-center md:text-left">
      <div className="hidden mr-4 flex-shrink-0 self-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hidden m-2 max-w-full lg:max-w-lg max-h-16 mx-auto"
          src={metadata.logo_url}
          alt=""
        />
      </div>
      <div>
        <h2 className="mt-3 md:mt-5 font-bold text-3xl md:text-3xl">
          {metadata.name}
        </h2>
        <p className="hidden mt-3 text-xl mx-5 md:mx-0">{metadata.address}</p>
        <p className="hidden text-xl">{metadata.website}</p>
      </div>
    </div>
  )
}
