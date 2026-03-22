import jsPDF from "jspdf";
import { companyInfo } from "@/lib/company";

const brandColors = {
  darkBlue: "#006bb3",
  gray: "#464646",
  lightGray: "#f5f5f5",
  border: "#d7d7d7",
  white: "#ffffff",
  slate: "#667085",
  softBlue: "#eaf4fb",
} as const;

const LETTERHEAD_HEIGHT = 34;
const PAGE_MARGIN = 15;
const CONTENT_TOP_PADDING = 12;
const IMAGE_HEIGHT = 62;

export interface CatalogPdfProduct {
  id?: string;
  title: string;
  category?: string;
  imageUrl?: string;
  specifications?: string;
  description?: string;
  features?: string[];
  technicalSpecs?: Record<string, string | number | undefined>;
  price?: string;
  manufacturer?: string;
  year?: number;
  condition?: string;
  isInStock?: boolean;
}

const specMapping: Record<string, string> = {
  controlSystem: "Control system",
  workingSpindleDiameter: "Working spindle diameter",
  travelX: "Travel X-axis",
  travelY: "Travel Y-axis",
  spindleSpeed: "Spindle speed",
  travelW: "Spindle travel - W axis",
  coolingThroughSpindle: "Cooling through spindle",
  coolingPressure: "Cooling pressure",
  toolMagazine: "Tool magazine",
  spindleTaper: "Spindle taper",
  travelZ: "Travel Z-axis",
  axisV: "Axis V",
  clampingAreaOfTable: "Clamping area of table",
  maxLoadOfTable: "Max. load of table",
  mainMotorPower: "Main motor power",
  machineDimensions: "Machine dimensions",
  machineWeight: "Machine weight",
  clampingAreaOfRotaryTable: "Rotary table clamping area",
  numberOfPositionsInMagazine: "Magazine positions",
  totalInput: "Total input",
  facePlateDiameter: "Face plate diameter",
  maxDiameterOfFaceTurning: "Max. face turning diameter",
  rapidFeed: "Rapid feed",
  tableDimensions: "Table dimensions",
  ramDimensions: "Ram dimensions",
  ramTravelZ: "Ram travel (Z)",
  maxDiameterOfMilledWheel: "Max. milled wheel diameter",
  rapidFeedX: "X-axis rapid feed",
  rapidFeedY: "Y-axis rapid feed",
  rapidFeedZ: "Z-axis rapid feed",
  numberOfDrivenAxes: "Driven axes",
  maxWeightOfWorkpiece: "Max. workpiece weight",
  numberOfPallets: "Pallets",
  axisB: "Axis B",
  axisC: "Axis C",
  spaceOfMachine: "Machine space",
  accuracyRepeatability: "Accuracy - repeatability",
  accuracyPositioning: "Accuracy - positioning",
  maxDiameterOfWorkpiece: "Max. workpiece diameter",
  maxLengthOfWorkpiece: "Max. workpiece length",
  maxWorkpieceHeight: "Max. workpiece height",
  drivenTools: "Driven tools",
  axisW: "Axis W",
  tableRotation: "Table rotation",
  turretHead: "Turret head",
  clampingDiameterOfRotaryTable: "Rotary table clamping diameter",
  maxTorqueOfSpindle: "Max. spindle torque",
  swingOverCrossSlide: "Swing over cross slide",
  spindleBore: "Spindle bore",
  rotationsOfClampingPlate: "Clamping plate rotations",
  feedingSpeed: "Feeding speed",
  numberOfToolPositionsDriven: "Driven tool positions",
  speedDrivenTools: "Driven tool speed",
  turnTableDiameter: "Turn table diameter",
  turningLength: "Turning length",
  barLoader: "Bar loader",
  slopingBed: "Sloping bed",
  maxBarDiameter: "Max. bar diameter",
  swingOverBed: "Swing over bed",
  chuckDiameter: "Chuck diameter",
  distanceBetweenCentres: "Distance between centres",
  millingHead: "Milling head",
  counterspindle: "Counterspindle",
  travelYLathe: "Travel Y-axis (lathe)",
  maxDrillingDiameter: "Max. drilling diameter",
  grindingSpindleSpeed: "Grinding spindle speed",
};

const imageCache = new Map<string, Promise<string | null>>();

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
      r: Number.parseInt(result[1], 16),
      g: Number.parseInt(result[2], 16),
      b: Number.parseInt(result[3], 16),
    }
    : { r: 0, g: 107, b: 179 };
}

function getContentStartY() {
  return LETTERHEAD_HEIGHT + CONTENT_TOP_PADDING;
}

function formatCategoryName(category?: string) {
  if (!category) {
    return "Other Machines";
  }

  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatCondition(condition?: string) {
  if (!condition) {
    return undefined;
  }

  return condition
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeSpecRows(technicalSpecs?: Record<string, string | number | undefined>) {
  if (!technicalSpecs) {
    return [];
  }

  return Object.entries(technicalSpecs)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([key, value]) => ({
      label: specMapping[key] || key,
      value: String(value),
    }));
}

async function loadOptimizedImageDataUrl(
  imageUrl: string,
  options?: { maxWidth?: number; quality?: number }
) {
  const cacheKey = `${imageUrl}|${options?.maxWidth || 0}|${options?.quality || 0}`;

  if (!imageCache.has(cacheKey)) {
    imageCache.set(
      cacheKey,
      fetch(imageUrl)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Failed to load image: ${response.status}`);
          }

          const blob = await response.blob();

          return await new Promise<string>((resolve, reject) => {
            const objectUrl = URL.createObjectURL(blob);
            const image = new Image();

            image.onload = () => {
              const maxWidth = options?.maxWidth || 640;
              const quality = options?.quality || 0.72;
              const scale = Math.min(1, maxWidth / image.width);
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");

              canvas.width = Math.max(1, Math.round(image.width * scale));
              canvas.height = Math.max(1, Math.round(image.height * scale));

              if (!context) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Unable to optimize image"));
                return;
              }

              context.fillStyle = "#ffffff";
              context.fillRect(0, 0, canvas.width, canvas.height);
              context.drawImage(image, 0, 0, canvas.width, canvas.height);

              const optimizedDataUrl = canvas.toDataURL("image/jpeg", quality);
              URL.revokeObjectURL(objectUrl);
              resolve(optimizedDataUrl);
            };

            image.onerror = () => {
              URL.revokeObjectURL(objectUrl);
              reject(new Error("Unable to load image"));
            };

            image.src = objectUrl;
          });
        })
        .catch(() => null)
    );
  }

  return imageCache.get(cacheKey)!;
}

async function addWatermark(doc: jsPDF, pageWidth: number, pageHeight: number) {
  const logoDataUrl = await loadOptimizedImageDataUrl(companyInfo.pdfLogoPath, {
    maxWidth: 200,
    quality: 0.5,
  });

  if (!logoDataUrl) return;

  // Use jspdf-extgstate for opacity
  doc.saveGraphicsState();
  
  // @ts-ignore - GState is a plugin for jsPDF
  const gState = new (doc as any).GState({ opacity: 0.05 });
  doc.setGState(gState);

  const logoWidth = 60;
  const logoHeight = 40;
  
  // Draw tiled watermark across the page
  const spacingX = 100;
  const spacingY = 80;
  
  for (let y = -20; y < pageHeight + 40; y += spacingY) {
    for (let x = -20; x < pageWidth + 40; x += spacingX) {
      // Rotate 45 degrees
      doc.addImage(
        logoDataUrl, 
        "JPEG", 
        x, 
        y, 
        logoWidth, 
        logoHeight, 
        undefined, 
        "NONE", 
        -45
      );
    }
  }

  doc.restoreGraphicsState();
}

async function addLetterhead(doc: jsPDF, pageWidth: number) {
  const blue = hexToRgb(brandColors.darkBlue);
  const gray = hexToRgb(brandColors.gray);
  const border = hexToRgb(brandColors.border);
  const logoDataUrl = await loadOptimizedImageDataUrl(companyInfo.pdfLogoPath, {
    maxWidth: 360,
    quality: 0.7,
  });

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, LETTERHEAD_HEIGHT, "F");
  doc.setDrawColor(border.r, border.g, border.b);
  doc.setLineWidth(0.3);
  doc.line(PAGE_MARGIN, LETTERHEAD_HEIGHT, pageWidth - PAGE_MARGIN, LETTERHEAD_HEIGHT);

  doc.setTextColor(gray.r, gray.g, gray.b);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  const leftText = [
    companyInfo.addressLines[0],
    companyInfo.addressLines[1],
    companyInfo.addressLines[2],
    `Mobile: ${companyInfo.phone}`,
    `Web: ${companyInfo.website}`,
    `E-mail: ${companyInfo.primaryEmail}`,
    `       ${companyInfo.secondaryEmail}`,
    "Dealer and Consultant in Industrial Machinery",
  ];

  let textY = 7;
  for (const line of leftText) {
    doc.text(line, PAGE_MARGIN, textY);
    textY += 3.6;
  }

  if (logoDataUrl) {
    const logoWidth = 48;
    const logoHeight = 32;
    const logoX = pageWidth - PAGE_MARGIN - logoWidth;
    const logoY = 8;

    doc.addImage(logoDataUrl, "JPEG", logoX, logoY, logoWidth, logoHeight);
  } else {
    doc.setTextColor(blue.r, blue.g, blue.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(companyInfo.name.toUpperCase(), pageWidth - PAGE_MARGIN, 15, {
      align: "right",
    });
  }
}

function addFooter(doc: jsPDF, pageWidth: number, pageHeight: number) {
  const blue = hexToRgb(brandColors.darkBlue);

  const footerY = pageHeight - 15;
  doc.setFillColor(blue.r, blue.g, blue.b);
  doc.rect(0, footerY, pageWidth, 15, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(
    `For more information, visit ${companyInfo.website} or contact us at ${companyInfo.phone}`,
    pageWidth / 2,
    footerY + 9.5,
    { align: "center" }
  );
}

function drawSectionTitle(doc: jsPDF, title: string, yPos: number) {
  const blue = hexToRgb(brandColors.darkBlue);
  const softBlue = hexToRgb(brandColors.softBlue);

  doc.setFillColor(softBlue.r, softBlue.g, softBlue.b);
  doc.roundedRect(PAGE_MARGIN, yPos - 5, 70, 9, 2, 2, "F");
  doc.setTextColor(blue.r, blue.g, blue.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(title, PAGE_MARGIN + 4, yPos);
}

function drawMetaPill(
  doc: jsPDF,
  text: string,
  xPos: number,
  yPos: number,
  colors?: { fill: string; text: string }
) {
  const fill = hexToRgb(colors?.fill || brandColors.softBlue);
  const textColor = hexToRgb(colors?.text || brandColors.darkBlue);
  const width = Math.min(54, doc.getTextWidth(text) + 10);

  doc.setFillColor(fill.r, fill.g, fill.b);
  doc.roundedRect(xPos, yPos - 4.5, width, 8, 4, 4, "F");
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(text, xPos + 5, yPos);

  return width;
}

function addWrappedText(
  doc: jsPDF,
  text: string,
  xPos: number,
  yPos: number,
  maxWidth: number,
  lineHeight = 5
) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, xPos, yPos);
  return yPos + lines.length * lineHeight;
}

async function renderCatalogProductPage(
  doc: jsPDF,
  product: CatalogPdfProduct,
  isFirstPage: boolean
) {
  if (!isFirstPage) {
    doc.addPage();
  }

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const blue = hexToRgb(brandColors.darkBlue);
  const gray = hexToRgb(brandColors.gray);
  const lightGray = hexToRgb(brandColors.lightGray);
  const border = hexToRgb(brandColors.border);
 
  // Add background watermark
  await addWatermark(doc, pageWidth, pageHeight);
 
  await addLetterhead(doc, pageWidth);

  let yPos = getContentStartY();

  drawSectionTitle(doc, formatCategoryName(product.category), yPos);
  yPos += 14;

  doc.setTextColor(blue.r, blue.g, blue.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  yPos = addWrappedText(doc, product.title, PAGE_MARGIN, yPos, pageWidth - PAGE_MARGIN * 2, 7);

  yPos += 3;
  let pillX = PAGE_MARGIN;
  pillX += drawMetaPill(doc, formatCategoryName(product.category), pillX, yPos) + 3;

  if (product.isInStock !== undefined) {
    pillX +=
      drawMetaPill(doc, product.isInStock ? "In Stock" : "Out of Stock", pillX, yPos, {
        fill: product.isInStock ? "#e8f7ec" : "#fdecea",
        text: product.isInStock ? brandColors.darkBlue : brandColors.slate,
      }) + 3;
  }

  if (product.condition) {
    drawMetaPill(doc, formatCondition(product.condition) || "", pillX, yPos);
  }

  yPos += 12;

  const imageWidth = 78;
  const imageX = PAGE_MARGIN;
  const imageY = yPos;
  const rightColumnX = PAGE_MARGIN + imageWidth + 8;
  const rightColumnWidth = pageWidth - rightColumnX - PAGE_MARGIN;

  doc.setDrawColor(border.r, border.g, border.b);
  doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
  doc.roundedRect(imageX, imageY, imageWidth, IMAGE_HEIGHT, 3, 3, "FD");

  if (product.imageUrl) {
    const productImageDataUrl = await loadOptimizedImageDataUrl(product.imageUrl, {
      maxWidth: 900,
      quality: 0.68,
    });

    if (productImageDataUrl) {
      doc.addImage(productImageDataUrl, "JPEG", imageX + 2, imageY + 2, imageWidth - 4, IMAGE_HEIGHT - 4);
    } else {
      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text("Image unavailable", imageX + 16, imageY + IMAGE_HEIGHT / 2);
    }
  } else {
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("No image", imageX + 25, imageY + IMAGE_HEIGHT / 2);
  }

  doc.setTextColor(gray.r, gray.g, gray.b);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const summaryRows = [
    ["Manufacturer", product.manufacturer || "Available on request"],
    ["Year", product.year ? String(product.year) : "Available on request"],
    ["Price", product.price || "Price on request"],
  ];

  let metaY = imageY + 4;
  for (const [label, value] of summaryRows) {
    doc.setTextColor(blue.r, blue.g, blue.b);
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, rightColumnX, metaY);
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFont("helvetica", "normal");
    metaY = addWrappedText(doc, value, rightColumnX + 22, metaY, rightColumnWidth - 22, 4.6);
    metaY += 2;
  }

  yPos += IMAGE_HEIGHT + 10;

  if (product.description) {
    drawSectionTitle(doc, "Overview", yPos);
    yPos += 10;
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    yPos = addWrappedText(doc, product.description, PAGE_MARGIN, yPos, pageWidth - PAGE_MARGIN * 2, 5);
    yPos += 6;
  }

  if (product.features?.length) {
    drawSectionTitle(doc, "Key Features", yPos);
    yPos += 10;
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    for (const feature of product.features) {
      if (yPos > pageHeight - 28) {
        doc.addPage();
        await addLetterhead(doc, pageWidth);
        yPos = getContentStartY();
      }

      yPos = addWrappedText(doc, `- ${feature}`, PAGE_MARGIN, yPos, pageWidth - PAGE_MARGIN * 2, 5);
      yPos += 1;
    }

    yPos += 4;
  }

  if (product.specifications) {
    drawSectionTitle(doc, "Specifications", yPos);
    yPos += 10;
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    yPos = addWrappedText(doc, product.specifications, PAGE_MARGIN, yPos, pageWidth - PAGE_MARGIN * 2, 5);
    yPos += 6;
  }

  const specRows = normalizeSpecRows(product.technicalSpecs);
  if (specRows.length) {
    if (yPos > pageHeight - 55) {
      doc.addPage();
      await addLetterhead(doc, pageWidth);
      yPos = getContentStartY();
    }

    drawSectionTitle(doc, "Technical Specifications", yPos);
    yPos += 10;

    const leftX = PAGE_MARGIN;
    const leftWidth = 58;
    const rowWidth = pageWidth - PAGE_MARGIN * 2;

    for (let index = 0; index < specRows.length; index += 1) {
      const spec = specRows[index];
      const rowHeight = 8;

      if (yPos > pageHeight - 24) {
        doc.addPage();
        await addLetterhead(doc, pageWidth);
        yPos = getContentStartY();
      }

      if (index % 2 === 0) {
        doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
        doc.rect(leftX, yPos - 5.5, rowWidth, rowHeight, "F");
      }

      doc.setTextColor(blue.r, blue.g, blue.b);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(spec.label, leftX + 3, yPos);

      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(spec.value, rowWidth - leftWidth - 8), leftX + leftWidth, yPos);

      yPos += rowHeight;
    }
  }

  addFooter(doc, pageWidth, pageHeight);
}

export async function generateCatalogPDF(products: CatalogPdfProduct[] = []) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const gray = hexToRgb(brandColors.gray);

  if (products.length === 0) {
    await addLetterhead(doc, pageWidth);
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("No catalog products are available right now.", PAGE_MARGIN, getContentStartY());
    addFooter(doc, pageWidth, pageHeight);
    doc.save("Shivam_Enterprise_Catalog.pdf");
    return;
  }

  for (let index = 0; index < products.length; index += 1) {
    await renderCatalogProductPage(doc, products[index], index === 0);
  }

  doc.save("Shivam_Enterprise_Catalog.pdf");
}

export async function generateProductPDF(
  product: CatalogPdfProduct & {
    title: string;
  }
) {
  const doc = new jsPDF();
  await renderCatalogProductPage(doc, product, true);
  const fileName = product.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  doc.save(`${fileName}_details.pdf`);
}
