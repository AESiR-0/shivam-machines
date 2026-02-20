"use client";

interface ProductSpecificationsProps {
  specifications: string;
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  // Parse specifications - they might be in format "Key: Value | Key: Value" or just text
  const parseSpecifications = (specs: string) => {
    // Try to parse as key-value pairs separated by | or , or newlines
    const pairs = specs.split(/\s*[,|]\s*|\n/).filter(Boolean);

    return pairs.map((pair) => {
      const colonIndex = pair.indexOf(":");
      if (colonIndex > 0) {
        return {
          key: pair.substring(0, colonIndex).trim(),
          value: pair.substring(colonIndex + 1).trim(),
        };
      }
      // If no colon, treat as a single value without a specific key
      return { key: "", value: pair.trim() };
    });
  };

  const specList = parseSpecifications(specifications);

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-darkBlue mb-4 font-candara">
        Technical Specifications
      </h2>
      <p className="text-lg leading-relaxed font-nunito text-brand-gray">
        {specList.map((spec, index) => (
          <span key={index}>
            {spec.key && (
              <span className="font-semibold text-brand-darkBlue">
                {spec.key}:{" "}
              </span>
            )}
            <span>{spec.value}</span>
            {index < specList.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}

