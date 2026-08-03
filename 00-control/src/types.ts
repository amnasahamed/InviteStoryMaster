export type MediaSlot = {
  id: string;
  label: string;
  relativePath: string;
  aspect?: string;
};

export type EditorField = {
  path: string;
  label: string;
  type?: "text" | "textarea" | "number" | "datetime" | "maps";
  hint?: string;
};

export type EditorSection = {
  id: string;
  label: string;
  description?: string;
  alwaysOn?: boolean;
  toggleKey?: string;
  kind?: "fields" | "story" | "contacts" | "events" | "media";
  fields?: EditorField[];
  mediaSlotIds?: string[];
};

export type TemplateInfo = {
  id: string;
  folder: string;
  name: string;
  tagline: string;
  vibe: string;
  palette: string[];
  language: string;
  weddingType: string;
  highlight: string;
  configPath: string;
  adapter: string;
  sectionsSupported: boolean;
  sectionKeys: string[];
  mediaSlots: MediaSlot[];
  editorSections: EditorSection[];
  deferred?: boolean;
};

export type ClientConfig = {
  meta: {
    templateId: string;
    slug: string;
    brand?: string;
    hashtag?: string;
    monogram?: string;
  };
  couple: {
    bride: { first: string; full?: string; short?: string; parents?: string };
    groom: { first: string; full?: string; short?: string; parents?: string };
    displayOrder?: [string, string];
  };
  copy: {
    intro?: string;
    tagline?: string;
    blessing?: string;
    invitationNote?: string;
    closing?: string;
    verseHindi?: string;
    verseText?: string;
  };
  timing: {
    primaryISO: string;
    endISO?: string;
    dateLabel: string;
    timeLabel?: string;
    dateParts?: { day?: string; number?: string; monthYear?: string; time?: string };
  };
  venue: {
    name: string;
    address: string;
    city?: string;
    mapQuery: string;
    mapsUrl?: string;
    lat?: number;
    lng?: number;
    note?: string;
  };
  events?: Array<{
    id: string;
    name: string;
    startISO: string;
    endISO?: string;
    durationMinutes?: number;
    venue?: string;
    address?: string;
    dressCode?: string;
    note?: string;
  }>;
  story?: Array<{ year?: string; title: string; date?: string; text: string }>;
  contacts?: Array<{ name: string; role?: string; phone: string }>;
  sections: Record<string, boolean>;
  media?: Record<string, string>;
  lastBuild?: { status?: string; at?: string; log?: string };
};

export type ClientSummary = {
  slug: string;
  templateId: string;
  templateName: string;
  bride?: string;
  groom?: string;
  dateLabel?: string;
  lastBuild?: { status?: string; at?: string };
  deferred?: boolean;
};
