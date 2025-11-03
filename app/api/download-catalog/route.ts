import { NextResponse } from 'next/server';

// Brand colors
const brandColors = {
  darkBlue: '#0a192f',
  orange: '#f9a826',
  gray: '#464646',
  lightGray: '#f5f5f5',
  steel: '#475569',
};

export async function GET() {
  try {
    // In production, we'll use a library like jsPDF on the client side
    // For server-side, we can use puppeteer or similar
    // For now, return a JSON response that the client can use
    
    const catalogData = {
      title: "Shivam Enterprise - Machine Tools Catalog",
      company: "Shivam Enterprise",
      contact: {
        phone: "+91-9824080055",
        email: "shivamenterprise@yahoo.com",
        address: "6- Ganpat Colony, Opp, Civil Hospital, Shahibaug, Ahmedabad, Gujarat - 380016"
      },
      machines: [
        { name: "Horizontal Boring Machine - Table Type", specs: "X-2200, Y-2000 | Table: 1500 x 1800 | Spindle: 125" },
        { name: "Cylindrical Grinding Machine", specs: "Max Length: 1000mm | Max Swing: 400mm" },
        { name: "Vertical Lathe Machine", specs: "Max Turning: 1500mm | Max Swing: 500mm" },
        { name: "CNC Machining Centers", specs: "Work Envelope: 1000x800x600mm | Spindle: 8000 RPM" },
        { name: "Gear Machines", specs: "Max Gear Diameter: 800mm | Module Range: 1-20" },
        { name: "Milling Machines", specs: "Various configurations available" },
        { name: "Surface Grinders", specs: "High precision surface grinding" },
        { name: "Drill Machines", specs: "Radial and precision drilling" },
      ]
    };

    // Return data for client-side PDF generation
    return NextResponse.json({ 
      message: "Please use the client-side PDF generator",
      data: catalogData 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate catalog' },
      { status: 500 }
    );
  }
}
