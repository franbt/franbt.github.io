import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function generateGazettePdf() {
  const doc = await PDFDocument.create();

  // Load fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontSerif = await doc.embedFont(StandardFonts.TimesRoman);
  const fontSerifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const fontSerifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  // Helper to load and embed local JPEG
  async function embedPhoto(filename) {
    try {
      const p = path.resolve('public/assets/photos', filename);
      if (fs.existsSync(p)) {
        const bytes = fs.readFileSync(p);
        return await doc.embedJpg(bytes);
      }
    } catch (e) {
      console.warn('Failed embedding', filename, e);
    }
    return null;
  }

  const sealImg = await embedPhoto('seal.jpg');
  const elenaImg = await embedPhoto('elena.jpg');
  const cafeImg = await embedPhoto('cafe.jpg');
  const storyImg = await embedPhoto('storytelling.jpg');
  const culinaryImg = await embedPhoto('culinary.jpg');
  const forestryImg = await embedPhoto('forestry.jpg');
  const caregivingImg = await embedPhoto('caregiving.jpg');
  const commonsImg = await embedPhoto('commons.jpg');

  // DIN A4 Landscape in points (297mm x 210mm) -> 841.89 x 595.28 pt
  const A4_W = 841.89;
  const A4_H = 595.28;
  const HALF_W = A4_W / 2;
  const MARGIN = 24;

  // Color constants
  const cNavy = rgb(6 / 255, 21 / 255, 35 / 255);
  const cNavyLight = rgb(27 / 255, 42 / 255, 56 / 255);
  const cCream = rgb(251 / 255, 249 / 255, 245 / 255);
  const cCreamDark = rgb(234 / 255, 232 / 255, 228 / 255);
  const cGreen = rgb(71 / 255, 101 / 255, 84 / 255);
  const cGreenLight = rgb(198 / 255, 232 / 255, 210 / 255);
  const cPeach = rgb(255 / 255, 181 / 255, 156 / 255);
  const cWhite = rgb(1, 1, 1);
  const cDark = rgb(27 / 255, 28 / 255, 26 / 255);
  const cGray = rgb(116 / 255, 119 / 255, 124 / 255);
  const cBorder = rgb(196 / 255, 198 / 255, 204 / 255);

  // ==========================================
  // SPREAD 1: COVER & FOREWORD (Pages 1 & 2)
  // ==========================================
  const page1 = doc.addPage([A4_W, A4_H]);
  
  // Left Page Background: Deep Ink Wash
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: HALF_W,
    height: A4_H,
    color: cNavy
  });

  // Right Page Background: Soft Institutional Cream
  page1.drawRectangle({
    x: HALF_W,
    y: 0,
    width: HALF_W,
    height: A4_H,
    color: cCream
  });

  // Center Gutter Divider
  page1.drawLine({
    start: { x: HALF_W, y: 0 },
    end: { x: HALF_W, y: A4_H },
    thickness: 1,
    color: cBorder
  });

  // --- LEFT PAGE (Cover) ---
  const leftX = MARGIN;
  const leftW = HALF_W - MARGIN * 2;

  // Header ribbon
  page1.drawText('AUTUMN–WINTER EDITION  |  VOL. IV / NO. 2', {
    x: leftX,
    y: A4_H - 40,
    size: 8,
    font: fontBold,
    color: cPeach
  });
  page1.drawText('MUNICIPAL DIRECTORATE FOR SOCIAL COHESION & CIVIC INCLUSION', {
    x: leftX,
    y: A4_H - 52,
    size: 7,
    font: fontRegular,
    color: rgb(184 / 255, 200 / 255, 218 / 255)
  });

  // Civic seal
  if (sealImg) {
    page1.drawImage(sealImg, {
      x: HALF_W - MARGIN - 48,
      y: A4_H - 74,
      width: 48,
      height: 48
    });
  }

  // Folio spine
  page1.drawLine({
    start: { x: leftX, y: A4_H - 78 },
    end: { x: leftX + 40, y: A4_H - 78 },
    thickness: 1,
    color: cPeach
  });
  page1.drawText('JOURNAL OF CIVIC INCLUSION & LOCAL PARTICIPATION', {
    x: leftX + 46,
    y: A4_H - 81,
    size: 7,
    font: fontBold,
    color: cPeach
  });

  // Big Title: CONVERGENCE
  page1.drawText('CONVERGENCE', {
    x: leftX,
    y: A4_H - 135,
    size: 42,
    font: fontSerifBold,
    color: cWhite
  });

  // Lead Dispatch Box
  page1.drawRectangle({
    x: leftX,
    y: A4_H - 200,
    width: leftW,
    height: 52,
    color: cNavyLight
  });
  page1.drawLine({
    start: { x: leftX, y: A4_H - 200 },
    end: { x: leftX, y: A4_H - 148 },
    thickness: 3,
    color: cGreenLight
  });
  page1.drawText('LEAD DISPATCH', {
    x: leftX + 12,
    y: A4_H - 162,
    size: 7,
    font: fontBold,
    color: cPeach
  });
  page1.drawText('Bridges Across Neighborhoods: Pathways for Welcoming & Inserting', {
    x: leftX + 12,
    y: A4_H - 176,
    size: 11,
    font: fontSerifBold,
    color: cWhite
  });
  page1.drawText('New Communities into Civic Life', {
    x: leftX + 12,
    y: A4_H - 190,
    size: 11,
    font: fontSerifBold,
    color: cWhite
  });

  // Metrics Triptych
  page1.drawRectangle({
    x: leftX,
    y: A4_H - 280,
    width: leftW,
    height: 65,
    color: rgb(15 / 255, 32 / 255, 48 / 255),
    borderColor: rgb(40 / 255, 60 / 255, 80 / 255),
    borderWidth: 1
  });
  // 14 Civic Districts
  page1.drawText('14', { x: leftX + 35, y: A4_H - 246, size: 24, font: fontSerifBold, color: cGreenLight });
  page1.drawText('Civic Districts', { x: leftX + 22, y: A4_H - 262, size: 7.5, font: fontBold, color: cPeach });
  page1.drawText('Active Citywide', { x: leftX + 24, y: A4_H - 272, size: 6.5, font: fontRegular, color: rgb(180 / 255, 190 / 255, 200 / 255) });

  // 3,420 New Residents
  page1.drawText('3,420', { x: leftX + 155, y: A4_H - 246, size: 24, font: fontSerifBold, color: cWhite });
  page1.drawText('New Residents', { x: leftX + 148, y: A4_H - 262, size: 7.5, font: fontBold, color: cPeach });
  page1.drawText('Enrolled & Paired', { x: leftX + 148, y: A4_H - 272, size: 6.5, font: fontRegular, color: rgb(180 / 255, 190 / 255, 200 / 255) });

  // 94% Retention Index
  page1.drawText('94%', { x: leftX + 285, y: A4_H - 246, size: 24, font: fontSerifBold, color: cGreenLight });
  page1.drawText('Retention Index', { x: leftX + 276, y: A4_H - 262, size: 7.5, font: fontBold, color: cPeach });
  page1.drawText('Over 12 Months', { x: leftX + 280, y: A4_H - 272, size: 6.5, font: fontRegular, color: rgb(180 / 255, 190 / 255, 200 / 255) });

  // Featured Folio Index Box
  page1.drawText('FEATURED FOLIO INDEX', { x: leftX, y: A4_H - 315, size: 8, font: fontBold, color: cPeach });
  const indexItems = [
    { num: '01', title: 'Intercultural Cafes & Language Tandem Networks', page: 'Folio 04' },
    { num: '02', title: 'Apprenticeships, Guild Incubators & Prior-Learning Pipeline', page: 'Folio 12' },
    { num: '03', title: 'The Neighborhood Living Rooms Initiative & Commons Map', page: 'Folio 22' },
    { num: '04', title: 'Comprehensive Municipal Directory: 32 Free Programs', page: 'Folio 36' }
  ];
  indexItems.forEach((item, idx) => {
    const yPos = A4_H - 338 - idx * 28;
    page1.drawRectangle({
      x: leftX,
      y: yPos - 6,
      width: leftW,
      height: 22,
      color: rgb(12 / 255, 28 / 255, 44 / 255)
    });
    page1.drawText(item.num, { x: leftX + 8, y: yPos + 3, size: 8, font: fontBold, color: cGreenLight });
    page1.drawText(item.title, { x: leftX + 28, y: yPos + 2, size: 8, font: fontSerifBold, color: cWhite });
    page1.drawText(item.page, { x: leftX + leftW - 48, y: yPos + 3, size: 7.5, font: fontRegular, color: cPeach });
  });

  // Cover footer
  page1.drawLine({
    start: { x: leftX, y: 35 },
    end: { x: leftX + leftW, y: 35 },
    thickness: 0.5,
    color: rgb(80 / 255, 100 / 255, 120 / 255)
  });
  page1.drawText('CITY PRINT OFFICE · DEPT. SC-MI · ARCHIVAL REGISTRATION DLG-2024-CIV-049', {
    x: leftX,
    y: 22,
    size: 7,
    font: fontRegular,
    color: rgb(160 / 255, 175 / 255, 190 / 255)
  });
  page1.drawText('SPREAD 001 · ARCHIVE COV', {
    x: leftX + leftW - 110,
    y: 22,
    size: 7,
    font: fontBold,
    color: cPeach
  });

  // --- RIGHT PAGE (Foreword & Editorial) ---
  const rightX = HALF_W + MARGIN;
  const rightW = HALF_W - MARGIN * 2;

  // Editorial Top Ribbon
  page1.drawRectangle({
    x: rightX,
    y: A4_H - 44,
    width: 80,
    height: 16,
    color: cGreen
  });
  page1.drawText('GAZETTE EDITORIAL', {
    x: rightX + 6,
    y: A4_H - 37,
    size: 6.5,
    font: fontBold,
    color: cWhite
  });
  page1.drawText('OPENING FOREWORD', {
    x: rightX + 88,
    y: A4_H - 37,
    size: 7.5,
    font: fontBold,
    color: cGray
  });
  page1.drawText('PAGE 002 / 048', {
    x: rightX + rightW - 65,
    y: A4_H - 37,
    size: 7.5,
    font: fontBold,
    color: cDark
  });

  page1.drawLine({
    start: { x: rightX, y: A4_H - 52 },
    end: { x: rightX + rightW, y: A4_H - 52 },
    thickness: 0.75,
    color: cBorder
  });

  // Headline
  page1.drawText('A City Measured by Its Welcoming Threshold', {
    x: rightX,
    y: A4_H - 80,
    size: 19,
    font: fontSerifBold,
    color: cNavy
  });
  page1.drawText('"A city is only as resilient as its newest neighbor. How localized social architecture creates belonging."', {
    x: rightX,
    y: A4_H - 96,
    size: 8.5,
    font: fontSerifItalic,
    color: cGray
  });

  // Elena Portrait & Bio Card
  const bioW = 125;
  const bioH = 190;
  const bioY = A4_H - 110 - bioH;
  page1.drawRectangle({
    x: rightX,
    y: bioY,
    width: bioW,
    height: bioH,
    color: cCreamDark,
    borderColor: cBorder,
    borderWidth: 0.5
  });

  if (elenaImg) {
    page1.drawImage(elenaImg, {
      x: rightX + 10,
      y: bioY + 75,
      width: bioW - 20,
      height: 105
    });
  }

  page1.drawText('Elena Rostova', {
    x: rightX + 10,
    y: bioY + 58,
    size: 11,
    font: fontSerifBold,
    color: cNavy
  });
  page1.drawText('Director of Civic Integration', {
    x: rightX + 10,
    y: bioY + 46,
    size: 7,
    font: fontRegular,
    color: cDark
  });
  page1.drawText('Municipal Office of Social Cohesion', {
    x: rightX + 10,
    y: bioY + 36,
    size: 6.5,
    font: fontBold,
    color: cGreen
  });
  page1.drawLine({
    start: { x: rightX + 10, y: bioY + 28 },
    end: { x: rightX + bioW - 10, y: bioY + 28 },
    thickness: 0.5,
    color: cBorder
  });
  page1.drawText('E. Rostova', {
    x: rightX + 10,
    y: bioY + 14,
    size: 11,
    font: fontSerifItalic,
    color: cNavy
  });
  page1.drawText('SIGN-OFF · 14 OCT 2024', {
    x: rightX + 70,
    y: bioY + 14,
    size: 5.5,
    font: fontBold,
    color: cGray
  });

  // Editorial Columns
  const colX = rightX + bioW + 16;
  const colW = rightW - bioW - 16;
  let textY = A4_H - 118;

  const essayLines = [
    'When we examine our public libraries, public squares, and community bakeries in',
    'early dawn, we witness the quiet machinery of mutual adaptation. Integration is',
    'neither passive nor unilateral; it is an active municipal practice of making room',
    'at every decision-making table.',
    '',
    'Over the past semester, our fourteen civic districts piloted the Neighborhood',
    'Living Rooms project, opening municipal annexes for evening dialogue, shared',
    'workspace, and peer-to-peer administrative accompaniment.',
    '',
    'Through decentralized language cafes and licensed mutual-aid kitchens, newcomers',
    'do not wait in the wings of civic society: they immediately steward the spaces',
    'they inhabit alongside multi-generational residents.'
  ];
  essayLines.forEach(line => {
    if (line === '') {
      textY -= 8;
    } else {
      page1.drawText(line, { x: colX, y: textY, size: 8, font: fontRegular, color: cDark });
      textY -= 13;
    }
  });

  // Editorial Pull Quote Block
  textY -= 6;
  page1.drawRectangle({
    x: colX,
    y: textY - 38,
    width: colW,
    height: 44,
    color: cGreenLight
  });
  page1.drawLine({
    start: { x: colX, y: textY - 38 },
    end: { x: colX, y: textY + 6 },
    thickness: 2.5,
    color: cGreen
  });
  page1.drawText('“Integration is not an assimilation into quiet corners, but active', {
    x: colX + 12,
    y: textY - 8,
    size: 8.5,
    font: fontSerifBold,
    color: cNavy
  });
  page1.drawText('co-creation of the public square.”', {
    x: colX + 12,
    y: textY - 20,
    size: 8.5,
    font: fontSerifBold,
    color: cNavy
  });
  page1.drawText('— Municipal Charter for Public Assembly, Section 4', {
    x: colX + 12,
    y: textY - 32,
    size: 6.5,
    font: fontBold,
    color: cGreen
  });

  // Departmental Registers Card Grid (Lower Right)
  const tocY = A4_H - 335;
  page1.drawText('GAZETTE REGISTERS & ACTION MODULES', {
    x: rightX,
    y: tocY,
    size: 8.5,
    font: fontBold,
    color: cNavy
  });
  page1.drawLine({
    start: { x: rightX, y: tocY - 6 },
    end: { x: rightX + rightW, y: tocY - 6 },
    thickness: 0.5,
    color: cBorder
  });

  const regCards = [
    { title: 'Ch. 01: Language & Cultural Tandems', desc: 'Cafe Polyglot & Story Circles', p: 'Folio 04' },
    { title: 'Ch. 02: Vocational Tracks & Apprenticeships', desc: 'Culinary, Forestry & Caregiving', p: 'Folio 12' },
    { title: 'Ch. 03: The Shared Commons Network', desc: '6 Active Hubs & MUN-SPACE-40', p: 'Folio 20' },
    { title: 'Public Register: 32 District Programs', desc: 'Ward Directory & Instant Signup', p: 'Folio 36' }
  ];

  regCards.forEach((c, i) => {
    const rx = rightX + (i % 2) * (rightW / 2 + 4);
    const ry = tocY - 20 - Math.floor(i / 2) * 54;
    const rw = rightW / 2 - 8;
    page1.drawRectangle({
      x: rx,
      y: ry - 42,
      width: rw,
      height: 48,
      color: cWhite,
      borderColor: cBorder,
      borderWidth: 0.5
    });
    page1.drawText(c.title, { x: rx + 8, y: ry - 14, size: 7.5, font: fontBold, color: cNavy });
    page1.drawText(c.desc, { x: rx + 8, y: ry - 26, size: 6.5, font: fontRegular, color: cGray });
    page1.drawText(c.p, { x: rx + rw - 38, y: ry - 38, size: 6.5, font: fontBold, color: cGreen });
  });

  // Right footer
  page1.drawLine({
    start: { x: rightX, y: 35 },
    end: { x: rightX + rightW, y: 35 },
    thickness: 0.5,
    color: cBorder
  });
  page1.drawText('CONVERGENCE INSTITUTIONAL GAZETTE · PUBLIC OFFICIAL RECORD', {
    x: rightX,
    y: 22,
    size: 7,
    font: fontRegular,
    color: cGray
  });
  page1.drawText('SPREAD 002 · FOLIO 01-02', {
    x: rightX + rightW - 110,
    y: 22,
    size: 7,
    font: fontBold,
    color: cNavy
  });

  // ==========================================
  // SPREAD 2: CHAPTER 1 - LANGUAGE EXCHANGE (Pages 3 & 4)
  // ==========================================
  const page2 = doc.addPage([A4_W, A4_H]);
  page2.drawRectangle({ x: 0, y: 0, width: A4_W, height: A4_H, color: cCream });
  page2.drawLine({ start: { x: HALF_W, y: 0 }, end: { x: HALF_W, y: A4_H }, thickness: 1, color: cBorder });

  // Page 2 Left: Lead Story & Photo
  page2.drawText('CHAPTER 01  |  INTERCULTURAL BRIDGES', { x: leftX, y: A4_H - 40, size: 8, font: fontBold, color: cGreen });
  page2.drawText('Conversations That Rebuild Belonging', { x: leftX, y: A4_H - 65, size: 20, font: fontSerifBold, color: cNavy });
  page2.drawText('FOLIO 08', { x: HALF_W - MARGIN - 45, y: A4_H - 40, size: 8, font: fontBold, color: cGray });

  if (cafeImg) {
    page2.drawImage(cafeImg, {
      x: leftX,
      y: A4_H - 240,
      width: leftW,
      height: 165
    });
    page2.drawRectangle({
      x: leftX,
      y: A4_H - 256,
      width: leftW,
      height: 16,
      color: cNavy
    });
    page2.drawText('Photo: Weekly Language Exchange Conservatory, Central Library Atrium (Ward 01)', {
      x: leftX + 8,
      y: A4_H - 252,
      size: 6.5,
      font: fontRegular,
      color: cWhite
    });
  }

  // Left Column Essay
  page2.drawText('The Dual-Track Linguistic Strategy', { x: leftX, y: A4_H - 280, size: 12, font: fontSerifBold, color: cNavy });
  const p2Text = [
    'Traditional immigrant integration often treats language solely as an emergency civic requirement',
    'rather than an exchange of gifts. The Dual-Track model operated in all 14 wards matches bilingual pairs',
    'so both participants practice as mentor and learner in equal 45-minute blocks.',
    '',
    'Over 1,200 pairings were registered this semester with zero dropouts reported in cohorts providing',
    'childcare creches. Participants report dramatic increases in self-advocacy and civic participation.'
  ];
  let p2Y = A4_H - 298;
  p2Text.forEach(l => {
    if (l === '') p2Y -= 6;
    else {
      page2.drawText(l, { x: leftX, y: p2Y, size: 7.5, font: fontRegular, color: cDark });
      p2Y -= 12;
    }
  });

  // Action Badge Box
  page2.drawRectangle({
    x: leftX,
    y: 50,
    width: leftW,
    height: 70,
    color: cGreenLight,
    borderColor: cGreen,
    borderWidth: 1
  });
  page2.drawText('TANDEM FELLOW ENROLLMENT (OPEN ADMISSIONS)', { x: leftX + 12, y: 102, size: 8, font: fontBold, color: cGreen });
  page2.drawText('Free weekly pairing matching 24 languages with licensed community mentors.', { x: leftX + 12, y: 88, size: 7.5, font: fontRegular, color: cDark });
  page2.drawText('Includes transit reimbursement, library cards, and certificate of completion.', { x: leftX + 12, y: 76, size: 7.5, font: fontRegular, color: cDark });
  page2.drawText('Enroll in person at any branch library or online at convergence-gazette.civic/tandem', { x: leftX + 12, y: 64, size: 7, font: fontBold, color: cNavy });

  // Page 2 Right: Timetable & Modules
  page2.drawText('WEEKLY MODULAR TIMETABLE  |  FOLIO 09', { x: rightX, y: A4_H - 40, size: 8, font: fontBold, color: cNavy });
  page2.drawText('Modular Language & Cultural Exchange', { x: rightX, y: A4_H - 65, size: 19, font: fontSerifBold, color: cNavy });

  const modules = [
    { code: 'MOD-01', name: 'Cafe Polyglot Sessions', time: 'Tuesdays & Thursdays · 17:30–19:30', loc: 'Central Library Conservatory', desc: 'Informal roundtable conversations in 12 dialect groups with coffee and snacks.' },
    { code: 'MOD-02', name: 'Bilingual Storytelling Circles', time: 'Saturdays · 10:30–12:00', loc: 'South District Children Annex', desc: 'Intergenerational folklore reading with free crèche and language crafts.' },
    { code: 'MOD-03', name: 'Civic Phrasebooks & Administrative Walkthroughs', time: 'Wednesdays · 14:00–16:00', loc: 'Municipal Center Hall B', desc: 'Hands-on practice navigating health clinics, school registration, and transit.' }
  ];

  let modY = A4_H - 95;
  modules.forEach(m => {
    page2.drawRectangle({
      x: rightX,
      y: modY - 60,
      width: rightW,
      height: 60,
      color: cWhite,
      borderColor: cBorder,
      borderWidth: 0.5
    });
    page2.drawRectangle({
      x: rightX,
      y: modY - 60,
      width: 4,
      height: 60,
      color: cGreen
    });
    page2.drawText(m.code, { x: rightX + 12, y: modY - 14, size: 7, font: fontBold, color: cPeach });
    page2.drawText(m.name, { x: rightX + 58, y: modY - 14, size: 9, font: fontSerifBold, color: cNavy });
    page2.drawText(m.time, { x: rightX + 12, y: modY - 28, size: 7.5, font: fontBold, color: cGreen });
    page2.drawText(m.loc, { x: rightX + 12, y: modY - 40, size: 7, font: fontRegular, color: cGray });
    page2.drawText(m.desc, { x: rightX + 12, y: modY - 52, size: 7, font: fontRegular, color: cDark });
    modY -= 70;
  });

  // Bottom Facilitator Framework
  page2.drawRectangle({
    x: rightX,
    y: 50,
    width: rightW,
    height: 100,
    color: cNavyLight
  });
  page2.drawText('FACILITATOR STANDARDS (MUNICIPAL CHARTER §8)', { x: rightX + 12, y: 132, size: 8, font: fontBold, color: cPeach });
  page2.drawText('1. Non-Hierarchical Pairing: Mentorship rotates bi-weekly.', { x: rightX + 12, y: 118, size: 7.5, font: fontRegular, color: cWhite });
  page2.drawText('2. Safe Harbor Environment: No immigration enforcement within 500m of sessions.', { x: rightX + 12, y: 106, size: 7.5, font: fontRegular, color: cWhite });
  page2.drawText('3. Universal Accessibility: Translation headsets and childcare guaranteed.', { x: rightX + 12, y: 94, size: 7.5, font: fontRegular, color: cWhite });
  page2.drawText('4. Certification: 40 completed hours eligible for civic integration credential.', { x: rightX + 12, y: 82, size: 7.5, font: fontRegular, color: cWhite });
  page2.drawText('Archival Folio 09 · Open Public Record', { x: rightX + 12, y: 64, size: 6.5, font: fontRegular, color: rgb(160 / 255, 175 / 255, 190 / 255) });

  // ==========================================
  // SPREAD 3: CHAPTER 2 - VOCATIONAL PATHWAYS (Pages 5 & 6)
  // ==========================================
  const page3 = doc.addPage([A4_W, A4_H]);
  page3.drawRectangle({ x: 0, y: 0, width: A4_W, height: A4_H, color: cCream });
  page3.drawLine({ start: { x: HALF_W, y: 0 }, end: { x: HALF_W, y: A4_H }, thickness: 1, color: cBorder });

  // Left Page: 4-Stage Pipeline
  page3.drawText('CHAPTER 02  |  ECONOMIC PARTICIPATION', { x: leftX, y: A4_H - 40, size: 8, font: fontBold, color: rgb(221 / 255, 114 / 255, 75 / 255) });
  page3.drawText('The 4-Stage Insertion Pipeline', { x: leftX, y: A4_H - 65, size: 20, font: fontSerifBold, color: cNavy });
  page3.drawText('FOLIO 14', { x: HALF_W - MARGIN - 45, y: A4_H - 40, size: 8, font: fontBold, color: cGray });

  if (storyImg) {
    page3.drawImage(storyImg, {
      x: leftX,
      y: A4_H - 220,
      width: leftW,
      height: 145
    });
    page3.drawRectangle({
      x: leftX,
      y: A4_H - 235,
      width: leftW,
      height: 15,
      color: cNavy
    });
    page3.drawText('Crafts Apprentice & Master Joiner, City Works Woodshop Depot', {
      x: leftX + 8,
      y: A4_H - 231,
      size: 6.5,
      font: fontRegular,
      color: cWhite
    });
  }

  // Pipeline 4 Stages
  const stages = [
    { num: '01', name: 'Prior-Learning Recognition', desc: 'Fast-track portfolio assessment translating overseas credentials without fees.' },
    { num: '02', name: 'Paid Guild Apprenticeships', desc: '16 weeks with living wage stipends and experienced trade mentorship.' },
    { num: '03', name: 'Micro-Enterprise Incubator', desc: 'Seed tooling grants, shared kitchen labs, and business licensing support.' },
    { num: '04', name: 'Permanent Municipal Hire', desc: 'Civil service priority placement and cooperative ownership rights.' }
  ];
  let stageY = A4_H - 250;
  stages.forEach(s => {
    page3.drawRectangle({
      x: leftX,
      y: stageY - 34,
      width: leftW,
      height: 30,
      color: cWhite,
      borderColor: cBorder,
      borderWidth: 0.5
    });
    page3.drawText(s.num, { x: leftX + 8, y: stageY - 14, size: 10, font: fontBold, color: rgb(221 / 255, 114 / 255, 75 / 255) });
    page3.drawText(s.name, { x: leftX + 32, y: stageY - 14, size: 8, font: fontBold, color: cNavy });
    page3.drawText(s.desc, { x: leftX + 32, y: stageY - 26, size: 6.5, font: fontRegular, color: cDark });
    stageY -= 36;
  });

  // Right Page: 3 Tracks with Photos
  page3.drawText('CURATED VOCATIONAL TRACKS  |  FOLIO 15', { x: rightX, y: A4_H - 40, size: 8, font: fontBold, color: cNavy });
  page3.drawText('Open Enrollment Programs Guaranteed by Statute', { x: rightX, y: A4_H - 65, size: 16, font: fontSerifBold, color: cNavy });

  const tracks = [
    { img: culinaryImg, num: 'Track 01', name: 'Culinary Heritage Incubator', dur: '12-Week Intensive', desc: 'Commercial kitchen licensing, regional hygiene certifications, catering logistics.' },
    { img: forestryImg, num: 'Track 02', name: 'Green Guild & Urban Forestry', dur: '16-Week Apprenticeship', desc: 'Full-time paid crews: structural arboriculture, storm-water timber, heavy machinery.' },
    { img: caregivingImg, num: 'Track 03', name: 'Caregiving & Early Childhood', dur: 'Direct Placement', desc: 'Pediatric care, eldercare dynamics, geriatric nutrition, 18 regional health trusts.' }
  ];

  let tY = A4_H - 90;
  tracks.forEach(t => {
    page3.drawRectangle({
      x: rightX,
      y: tY - 80,
      width: rightW,
      height: 75,
      color: cWhite,
      borderColor: cBorder,
      borderWidth: 0.5
    });
    if (t.img) {
      page3.drawImage(t.img, {
        x: rightX + 6,
        y: tY - 74,
        width: 80,
        height: 63
      });
    }
    const tx = rightX + 94;
    page3.drawText(t.num, { x: tx, y: tY - 14, size: 7.5, font: fontBold, color: rgb(221 / 255, 114 / 255, 75 / 255) });
    page3.drawText(t.dur, { x: rightX + rightW - 80, y: tY - 14, size: 7, font: fontRegular, color: cGray });
    page3.drawText(t.name, { x: tx, y: tY - 28, size: 9.5, font: fontSerifBold, color: cNavy });
    page3.drawText(t.desc, { x: tx, y: tY - 42, size: 7, font: fontRegular, color: cDark });
    page3.drawText('100% Tuition Sponsored via Civic Levies · Open Enrollment', { x: tx, y: tY - 56, size: 6.5, font: fontBold, color: cGreen });
    tY -= 88;
  });

  // Support Package Card
  page3.drawRectangle({
    x: rightX,
    y: 35,
    width: rightW,
    height: 90,
    color: cGreenLight,
    borderColor: cGreen,
    borderWidth: 1
  });
  page3.drawText('UNIVERSAL PARTICIPANT SUPPORT PACKAGE', { x: rightX + 12, y: 112, size: 8, font: fontBold, color: cNavy });
  page3.drawText('All apprentices receive wraparound civic support to ensure zero retention dropouts:', { x: rightX + 12, y: 100, size: 7, font: fontRegular, color: cDark });
  page3.drawText('• Transit Stipend: Monthly unlimited metropolitan bus and rail pass provided throughout training.', { x: rightX + 12, y: 86, size: 7, font: fontRegular, color: cDark });
  page3.drawText('• Childcare Vouchers: Direct municipal subsidies for daytime creche or registered family care partners.', { x: rightX + 12, y: 74, size: 7, font: fontRegular, color: cDark });
  page3.drawText('• Legal Document Prep: Pro-bono certification of licenses, translation, and notarization.', { x: rightX + 12, y: 62, size: 7, font: fontRegular, color: cDark });
  page3.drawText('Official Statutory Inclusion Policy · Municipal Board Decree 2024-08', { x: rightX + 12, y: 46, size: 6.5, font: fontBold, color: cGreen });

  // ==========================================
  // SPREAD 4: CHAPTER 3 - COMMONS & SPACES (Pages 7 & 8)
  // ==========================================
  const page4 = doc.addPage([A4_W, A4_H]);
  page4.drawRectangle({ x: 0, y: 0, width: A4_W, height: A4_H, color: cCream });
  page4.drawLine({ start: { x: HALF_W, y: 0 }, end: { x: HALF_W, y: A4_H }, thickness: 1, color: cBorder });

  // Left Page: 5 Pillars & Hubs
  page4.drawText('CHAPTER 03  |  THE SHARED COMMONS', { x: leftX, y: A4_H - 40, size: 8, font: fontBold, color: cGreen });
  page4.drawText('Neighborhood Living Rooms & Commons Map', { x: leftX, y: A4_H - 65, size: 19, font: fontSerifBold, color: cNavy });
  page4.drawText('FOLIO 20', { x: HALF_W - MARGIN - 45, y: A4_H - 40, size: 8, font: fontBold, color: cGray });

  // Map Representation Box
  page4.drawRectangle({
    x: leftX,
    y: A4_H - 240,
    width: leftW,
    height: 165,
    color: rgb(235 / 255, 238 / 255, 242 / 255),
    borderColor: cBorder,
    borderWidth: 1
  });
  page4.drawText('CIVIC COMMONS CARTOGRAPHIC NETWORK (14 WARDS)', { x: leftX + 12, y: A4_H - 95, size: 8, font: fontBold, color: cNavy });
  page4.drawText('Active Third Places with Zero Commercial Expectation', { x: leftX + 12, y: A4_H - 108, size: 7, font: fontRegular, color: cGray });

  const hubs = [
    { name: '1. St. Martin Community Hall (Ward 02)', use: 'Tech Coaching & Blitz Chess · Daily 08:00–21:00' },
    { name: '2. Riverside Allotment Gardens (Ward 08)', use: '85 Planters, Seed Bank · Tue–Sun 07:00–Sunset' },
    { name: '3. Old Foundry Arts & Maker Workshop (Ward 06)', use: 'Repair Cafe, Tool Library · Wed–Sat 10:00–20:00' },
    { name: '4. South District Municipal Library (Ward 09)', use: 'Welcoming Desk, Notarization · Mon–Sat 09:00–21:00' },
    { name: '5. Civic Sports Arena & Fieldhouse (Ward 08)', use: 'Drop-in sports, senior fitness · Daily 06:30–22:00' },
    { name: '6. Central Market Cultural Pavilion (Ward 04)', use: 'Solidarity flea stalls · Thu–Sun 08:00–18:00' }
  ];

  let hubY = A4_H - 128;
  hubs.forEach(h => {
    page4.drawText(h.name, { x: leftX + 12, y: hubY, size: 7.5, font: fontBold, color: cNavy });
    page4.drawText(h.use, { x: leftX + 12, y: hubY - 9, size: 6.5, font: fontRegular, color: cGreen });
    hubY -= 19;
  });

  // 5 Pillars Box
  page4.drawText('5 PILLARS OF THIRD PLACES', { x: leftX, y: A4_H - 265, size: 9, font: fontBold, color: cNavy });
  const pillars = [
    '1. Neutral Ground: No membership prerequisites or financial barrier.',
    '2. The Leveler: Professional status dissolves; equal neighborhood voice.',
    '3. Conversation is King: Acoustic design optimized for low-volume intimate dialogue.',
    '4. Accessibility & Hours: Open early morning and late evening outside working hours.',
    '5. Regulars & Welcoming Hosts: Dedicated municipal stewards welcoming first-time visitors.'
  ];
  let pilY = A4_H - 280;
  pillars.forEach(p => {
    page4.drawText(p, { x: leftX, y: pilY, size: 7, font: fontRegular, color: cDark });
    pilY -= 12;
  });

  // Right Page: Space Booking Guide & Photo
  page4.drawText('SPACE RESERVATION PROTOCOL  |  FOLIO 21', { x: rightX, y: A4_H - 40, size: 8, font: fontBold, color: cNavy });
  page4.drawText('Statutory Space Right: Policy MUN-SPACE-40', { x: rightX, y: A4_H - 65, size: 17, font: fontSerifBold, color: cNavy });

  if (commonsImg) {
    page4.drawImage(commonsImg, {
      x: rightX,
      y: A4_H - 220,
      width: rightW,
      height: 145
    });
    page4.drawRectangle({
      x: rightX,
      y: A4_H - 235,
      width: rightW,
      height: 15,
      color: cNavy
    });
    page4.drawText('Intergenerational Public Garden Workshop & Seed-Saving Collective', {
      x: rightX + 8,
      y: A4_H - 231,
      size: 6.5,
      font: fontRegular,
      color: cWhite
    });
  }

  // 4 Steps to Free Booking
  page4.drawText('HOW TO BOOK A MUNICIPAL ROOM IN 4 SIMPLE STEPS', { x: rightX, y: A4_H - 255, size: 8.5, font: fontBold, color: cNavy });
  const steps = [
    { n: 'Step 1: Choose Space', d: 'Filter by ward, capacity (10 to 120 people), and required amenities (kitchen, projector, tools).' },
    { n: 'Step 2: Select Collective', d: 'State your group name and purpose (educational, cultural, civic, or neighborhood care).' },
    { n: 'Step 3: Liability Clearance', d: 'Zero fee. Automatically covered under Municipal Umbrella Liability Policy MUN-SPACE-40.' },
    { n: 'Step 4: Smart Key Access', d: 'Instant digital key or QR code issued for contactless entry 30 mins before gathering.' }
  ];
  let stpY = A4_H - 275;
  steps.forEach(s => {
    page4.drawText(s.n, { x: rightX, y: stpY, size: 8, font: fontBold, color: cGreen });
    page4.drawText(s.d, { x: rightX, y: stpY - 11, size: 7, font: fontRegular, color: cDark });
    stpY -= 24;
  });

  page4.drawRectangle({
    x: rightX,
    y: 35,
    width: rightW,
    height: 48,
    color: cNavy,
    borderColor: cGreenLight,
    borderWidth: 1
  });
  page4.drawText('INSTANT SPACE BOOKING HOTLINE & ONLINE PORTAL', { x: rightX + 12, y: 68, size: 7.5, font: fontBold, color: cPeach });
  page4.drawText('Book online in the Gazette e-Reader: Click "Book Space" on any commons card.', { x: rightX + 12, y: 56, size: 7, font: fontRegular, color: cWhite });
  page4.drawText('Or call Municipal Community Desk: (020) 7946 0912 · Monday–Saturday 08:00–20:00', { x: rightX + 12, y: 44, size: 7, font: fontBold, color: cGreenLight });

  // Save PDF to public directory
  const pdfBytes = await doc.save();
  const outPath = path.resolve('public', 'CONVERGENCE_Gazette_Issue04_Autumn_Edition.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log('Saved master PDF to', outPath, 'Bytes:', pdfBytes.length);

  // Also write to assets directory so relative downloads always work
  const assetOutPath = path.resolve('assets', 'CONVERGENCE_Gazette_Issue04_Autumn_Edition.pdf');
  fs.writeFileSync(assetOutPath, pdfBytes);

  // Also write Municipal_Candidate_Intake_Form_2024.pdf
  await generateIntakeFormPdf();
}

async function generateIntakeFormPdf() {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontSerifBold = await doc.embedFont(StandardFonts.TimesRomanBold);

  // DIN A4 Portrait (210mm x 297mm) -> 595.28 x 841.89 pt
  const page = doc.addPage([595.28, 841.89]);
  const W = 595.28;
  const H = 841.89;
  const M = 36;

  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(251/255, 249/255, 245/255) });

  // Top header banner
  page.drawRectangle({ x: M, y: H - 90, width: W - M * 2, height: 60, color: rgb(6/255, 21/255, 35/255) });
  page.drawText('MUNICIPAL OFFICE OF SOCIAL COHESION & INTEGRATION', { x: M + 16, y: H - 52, size: 8, font: fontBold, color: rgb(255/255, 181/255, 156/255) });
  page.drawText('Candidate Intake & Civic Services Enrollment Form', { x: M + 16, y: H - 74, size: 16, font: fontSerifBold, color: rgb(1, 1, 1) });
  page.drawText('FORM SC-2024-INT', { x: W - M - 95, y: H - 52, size: 8, font: fontBold, color: rgb(198/255, 232/255, 210/255) });

  page.drawText('SECTION 1: PERSONAL & CONTACT INFORMATION', { x: M, y: H - 110, size: 9, font: fontBold, color: rgb(6/255, 21/255, 35/255) });
  page.drawLine({ start: { x: M, y: H - 115 }, end: { x: W - M, y: H - 115 }, thickness: 1, color: rgb(196/255, 198/255, 204/255) });

  const fields = [
    { label: 'Full Legal Name:', val: '________________________________________' },
    { label: 'Date of Birth (DD/MM/YYYY):', val: '____ / ____ / ________' },
    { label: 'Current Residential Ward:', val: 'Ward ________________ (14 Districts Available)' },
    { label: 'Primary Language(s) Spoken:', val: '________________________________________' },
    { label: 'Target Language for Exchange:', val: '________________________________________' },
    { label: 'Preferred Contact (Phone / Email):', val: '________________________________________' }
  ];
  let fy = H - 135;
  fields.forEach(f => {
    page.drawText(f.label, { x: M, y: fy, size: 8.5, font: fontBold, color: rgb(27/255, 28/255, 26/255) });
    page.drawText(f.val, { x: M + 190, y: fy, size: 8.5, font: fontRegular, color: rgb(70/255, 70/255, 70/255) });
    fy -= 24;
  });

  page.drawText('SECTION 2: CIVIC PATHWAY SELECTION', { x: M, y: fy - 15, size: 9, font: fontBold, color: rgb(6/255, 21/255, 35/255) });
  page.drawLine({ start: { x: M, y: fy - 20 }, end: { x: W - M, y: fy - 20 }, thickness: 1, color: rgb(196/255, 198/255, 204/255) });

  const tracks = [
    '[  ] Track 01: Culinary Heritage Incubator (Commercial kitchen licensing, Docklands)',
    '[  ] Track 02: Green Guild & Urban Forestry (Paid municipal forestry apprenticeship)',
    '[  ] Track 03: Caregiving & Early Childhood (18 Regional health trusts pre-placement)',
    '[  ] Language Tandem Fellow (Bi-weekly conversation partner, Cafe Polyglot)',
    '[  ] Community Space Host / Neighborhood Living Room Steward'
  ];
  let ty = fy - 40;
  tracks.forEach(t => {
    page.drawText(t, { x: M, y: ty, size: 8.5, font: fontRegular, color: rgb(27/255, 28/255, 26/255) });
    ty -= 20;
  });

  page.drawText('SECTION 3: STATUTORY WRAPAROUND SUPPORT REQUIRED', { x: M, y: ty - 15, size: 9, font: fontBold, color: rgb(6/255, 21/255, 35/255) });
  page.drawLine({ start: { x: M, y: ty - 20 }, end: { x: W - M, y: ty - 20 }, thickness: 1, color: rgb(196/255, 198/255, 204/255) });

  const support = [
    '[  ] Metropolitan Transit Stipend (Free monthly bus/tram/rail card)',
    '[  ] Daytime Childcare Subsidies / Municipal Creche Enrollment',
    '[  ] Legal Translation & Prior-Degree Equivalency Notarization',
    '[  ] Hearing / Visual / Mobility Accessibility Accommodations'
  ];
  let sy = ty - 40;
  support.forEach(s => {
    page.drawText(s, { x: M, y: sy, size: 8.5, font: fontRegular, color: rgb(27/255, 28/255, 26/255) });
    sy -= 20;
  });

  // Signature Block
  page.drawRectangle({ x: M, y: 70, width: W - M * 2, height: 100, color: rgb(234/255, 232/255, 228/255) });
  page.drawText('DECLARATION & SIGNATURE', { x: M + 14, y: 152, size: 8.5, font: fontBold, color: rgb(6/255, 21/255, 35/255) });
  page.drawText('I certify that the information provided is accurate and that I wish to participate in municipal cohesion programs.', { x: M + 14, y: 138, size: 7.5, font: fontRegular, color: rgb(27/255, 28/255, 26/255) });
  page.drawText('Signature: ___________________________________________   Date: ____ / ____ / ________', { x: M + 14, y: 105, size: 8.5, font: fontBold, color: rgb(6/255, 21/255, 35/255) });
  page.drawText('Form SC-2024-INT · Retain Copy for Candidate Record · Municipal Open Policy', { x: M + 14, y: 82, size: 7, font: fontRegular, color: rgb(116/255, 119/255, 124/255) });

  const intakeBytes = await doc.save();
  fs.writeFileSync(path.resolve('public', 'Municipal_Candidate_Intake_Form_2024.pdf'), intakeBytes);
  fs.writeFileSync(path.resolve('assets', 'Municipal_Candidate_Intake_Form_2024.pdf'), intakeBytes);
  console.log('Saved intake form PDF');
}

generateGazettePdf().catch(console.error);
