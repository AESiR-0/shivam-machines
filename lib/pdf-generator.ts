import jsPDF from 'jspdf';

// Brand colors
const brandColors = {
  darkBlue: '#006bb3',  // Brand blue
  orange: '#006bb3',    // Using brand blue for highlights
  gray: '#464646',      // Brand gray
  lightGray: '#f5f5f5',
  steel: '#464646',      // Using brand gray
};

export function generateCatalogPDF() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Helper to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 10, g: 25, b: 47 };
  };

  // Set brand colors
  const darkBlue = hexToRgb(brandColors.darkBlue);
  const orange = hexToRgb(brandColors.orange);
  const gray = hexToRgb(brandColors.gray);

  // Header
  doc.setFillColor(darkBlue.r, darkBlue.g, darkBlue.b);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SHIVAM ENTERPRISE', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Machine Tools Catalog', pageWidth / 2, 32, { align: 'center' });

  // Company Info
  let yPos = 55;
  doc.setTextColor(gray.r, gray.g, gray.b);
  doc.setFontSize(10);
  doc.text('Established in 1997 | Leading Supplier of Used Machine Tools', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;
  
  doc.setFontSize(9);
  doc.text('Contact: +91-9824080055 | Email: shivamenterprise@yahoo.com', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;
  doc.text('Address: 6- Ganpat Colony, Opp, Civil Hospital, Shahibaug, Ahmedabad, Gujarat - 380016', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Machines list
  const machines = [
    { name: "Horizontal Boring Machine - Table Type", specs: "X-2200, Y-2000 | Table: 1500 x 1800 | Spindle: 125" },
    { name: "Floor Type Boring Machine", specs: "Altezza Punte: 1.000 mm | Passaggio tra i Montanti: 1.000 mm" },
    { name: "Vertical Lathe Machine", specs: "Max Turning: 1500mm | Max Swing: 500mm" },
    { name: "Lathe Machine", specs: "Various configurations available" },
    { name: "Plano Miller Machine", specs: "Large surface milling operations" },
    { name: "Planning Machine", specs: "Surface planning operations" },
    { name: "Milling Machine", specs: "Versatile machining operations" },
    { name: "Grinding Machine - Surface Grinder", specs: "High-precision surface grinding" },
    { name: "Cylindrical Grinding Machine", specs: "Max Length: 1000mm | Max Swing: 400mm" },
    { name: "Roll Grinder", specs: "Precision roll grinding" },
    { name: "Drill Machine", specs: "Radial and precision drilling" },
    { name: "Gear Machines", specs: "Max Gear Diameter: 800mm | Module Range: 1-20" },
    { name: "CNC Machines - Horizontal Machining Centre", specs: "Work Envelope: 1000x800x600mm" },
    { name: "Vertical Machining Center", specs: "High-performance CNC control" },
    { name: "Turning Center", specs: "Precision turning operations" },
    { name: "Accessories/Others", specs: "Various machine accessories" },
  ];

  // Category sections
  const categories = [
    { name: "Boring Machines", machines: machines.filter(m => m.name.includes('Boring')) },
    { name: "Grinding Machines", machines: machines.filter(m => m.name.includes('Grinding') || m.name.includes('Grinder')) },
    { name: "Lathe Machines", machines: machines.filter(m => m.name.includes('Lathe') || m.name.includes('Turning')) },
    { name: "CNC Machines", machines: machines.filter(m => m.name.includes('CNC') || m.name.includes('Machining')) },
    { name: "Other Machines", machines: machines.filter(m => 
      !m.name.includes('Boring') && !m.name.includes('Grinding') && 
      !m.name.includes('Grinder') && !m.name.includes('Lathe') && 
      !m.name.includes('Turning') && !m.name.includes('CNC') && 
      !m.name.includes('Machining') && !m.name.includes('Accessories')
    )},
    { name: "Accessories", machines: machines.filter(m => m.name.includes('Accessories')) },
  ];

  categories.forEach((category, catIndex) => {
    if (category.machines.length === 0) return;

    // Check if new page needed
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    // Category header
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.roundedRect(10, yPos - 8, pageWidth - 20, 12, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(category.name, 15, yPos);
    
    yPos += 10;

    // Machines in category
    category.machines.forEach((machine) => {
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }

      doc.setTextColor(darkBlue.r, darkBlue.g, darkBlue.b);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`• ${machine.name}`, 15, yPos);
      
      yPos += 7;
      
      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const splitSpecs = doc.splitTextToSize(machine.specs, pageWidth - 30);
      doc.text(splitSpecs, 20, yPos);
      
      yPos += splitSpecs.length * 5 + 5;
    });

    yPos += 5;
  });

  // Footer
  const footerY = pageHeight - 15;
  doc.setFillColor(darkBlue.r, darkBlue.g, darkBlue.b);
  doc.rect(0, footerY, pageWidth, 15, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('For more information, visit shivammachines.in or contact us at +91-9824080055', pageWidth / 2, footerY + 10, { align: 'center' });

  // Download
  doc.save('Shivam_Enterprise_Catalog.pdf');
}

export function generateProductPDF(product: {
  title: string;
  description?: string;
  category?: string;
  specifications?: string;
  features?: string[];
  price?: string;
  manufacturer?: string;
  year?: number;
  condition?: string;
  isInStock?: boolean;
}) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Helper to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 10, g: 25, b: 47 };
  };

  // Set brand colors
  const darkBlue = hexToRgb(brandColors.darkBlue);
  const gray = hexToRgb(brandColors.gray);

  // Header
  doc.setFillColor(darkBlue.r, darkBlue.g, darkBlue.b);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SHIVAM ENTERPRISE', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Product Details', pageWidth / 2, 32, { align: 'center' });

  // Company Info
  let yPos = 55;
  doc.setTextColor(gray.r, gray.g, gray.b);
  doc.setFontSize(9);
  doc.text('Contact: +91-9824080055 | Email: shivamenterprise@yahoo.com', pageWidth / 2, yPos, { align: 'center' });
  yPos += 6;
  doc.text('Address: 6- Ganpat Colony, Opp, Civil Hospital, Shahibaug, Ahmedabad, Gujarat - 380016', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Product Title
  doc.setTextColor(darkBlue.r, darkBlue.g, darkBlue.b);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(product.title, pageWidth - 40);
  doc.text(titleLines, 20, yPos);
  yPos += titleLines.length * 8 + 10;

  // Category and Stock Status
  if (product.category) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.text(`Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`, 20, yPos);
    yPos += 8;
  }

  if (product.isInStock !== undefined) {
    doc.setTextColor(product.isInStock ? 0 : 255, product.isInStock ? 150 : 0, 0);
    doc.text(`Status: ${product.isInStock ? 'In Stock' : 'Out of Stock'}`, 20, yPos);
    yPos += 10;
  }

  // Price
  if (product.price) {
    doc.setTextColor(darkBlue.r, darkBlue.g, darkBlue.b);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Price: ${product.price}`, 20, yPos);
    yPos += 12;
  }

  // Product Details Grid
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray.r, gray.g, gray.b);
  
  if (product.manufacturer) {
    doc.text(`Manufacturer: ${product.manufacturer}`, 20, yPos);
    yPos += 7;
  }
  if (product.year) {
    doc.text(`Year: ${product.year}`, 20, yPos);
    yPos += 7;
  }
  if (product.condition) {
    const conditionLabel = product.condition.charAt(0).toUpperCase() + product.condition.slice(1).replace('-', ' ');
    doc.text(`Condition: ${conditionLabel}`, 20, yPos);
    yPos += 10;
  }

  // Description
  if (product.description) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setTextColor(darkBlue.r, darkBlue.g, darkBlue.b);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 20, yPos);
    yPos += 8;
    
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(product.description, pageWidth - 40);
    doc.text(descLines, 20, yPos);
    yPos += descLines.length * 5 + 10;
  }

  // Specifications
  if (product.specifications) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setTextColor(darkBlue.r, darkBlue.g, darkBlue.b);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Specifications', 20, yPos);
    yPos += 8;
    
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const specLines = doc.splitTextToSize(product.specifications, pageWidth - 40);
    doc.text(specLines, 20, yPos);
    yPos += specLines.length * 5 + 10;
  }

  // Features
  if (product.features && product.features.length > 0) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setTextColor(darkBlue.r, darkBlue.g, darkBlue.b);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Features', 20, yPos);
    yPos += 8;
    
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    product.features.forEach((feature) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`• ${feature}`, 20, yPos);
      yPos += 7;
    });
    yPos += 5;
  }

  // Footer
  const footerY = pageHeight - 15;
  doc.setFillColor(darkBlue.r, darkBlue.g, darkBlue.b);
  doc.rect(0, footerY, pageWidth, 15, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('For more information, visit shivammachines.in or contact us at +91-9824080055', pageWidth / 2, footerY + 10, { align: 'center' });

  // Download
  const fileName = product.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`${fileName}_details.pdf`);
}