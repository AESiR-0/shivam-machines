"use client";

interface ProductSpecificationsProps {
  specifications: string;
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  // Parse specifications - they might be in format "Key: Value | Key: Value" or just text
  const parseSpecifications = (specs: string) => {
    // Try to parse as key-value pairs separated by | or newlines
    const pairs = specs.split(/\s*\|\s*|\n/).filter(Boolean);
    
    return pairs.map((pair) => {
      const colonIndex = pair.indexOf(":");
      if (colonIndex > 0) {
        return {
          key: pair.substring(0, colonIndex).trim(),
          value: pair.substring(colonIndex + 1).trim(),
        };
      }
      // If no colon, treat as a single value
      return { key: "Specification", value: pair.trim() };
    });
  };

  const specList = parseSpecifications(specifications);

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 font-candara">
        Technical Specifications
      </h2>
      <div className="space-y-3">
        {specList.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0"
          >
            <span className="text-brand-gray font-medium font-nunito flex-1">
              {spec.key}
            </span>
            <span className="text-brand-darkBlue font-semibold font-nunito text-right flex-1 ml-4">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

