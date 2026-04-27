export const COLLECTION_PROMPT_TEMPLATE_STORAGE_KEY = "collection_prompt_template_selection_v1";

const EMPTY_TEMPLATE_SELECTION = {
  descriptionTemplateId: "",
  descriptionPromptTemplate: "",
  metaTitleTemplateId: "",
  metaTitlePromptTemplate: "",
  metaDescriptionTemplateId: "",
  metaDescriptionPromptTemplate: "",
};

function toStringOrEmpty(value) {
  return typeof value === "string" ? value : "";
}

function normalizeTemplateSelection(value) {
  const input = value && typeof value === "object" ? value : {};
  return {
    descriptionTemplateId: toStringOrEmpty(input.descriptionTemplateId),
    descriptionPromptTemplate: toStringOrEmpty(input.descriptionPromptTemplate),
    metaTitleTemplateId: toStringOrEmpty(input.metaTitleTemplateId),
    metaTitlePromptTemplate: toStringOrEmpty(input.metaTitlePromptTemplate),
    metaDescriptionTemplateId: toStringOrEmpty(input.metaDescriptionTemplateId),
    metaDescriptionPromptTemplate: toStringOrEmpty(input.metaDescriptionPromptTemplate),
  };
}

export function getEmptyCollectionTemplateSelection() {
  return { ...EMPTY_TEMPLATE_SELECTION };
}

export function readStoredCollectionPromptTemplateSelection() {
  if (typeof window === "undefined") return getEmptyCollectionTemplateSelection();

  try {
    const raw = window.localStorage.getItem(COLLECTION_PROMPT_TEMPLATE_STORAGE_KEY);
    if (!raw) return getEmptyCollectionTemplateSelection();
    return normalizeTemplateSelection(JSON.parse(raw));
  } catch {
    return getEmptyCollectionTemplateSelection();
  }
}

export function writeStoredCollectionPromptTemplateSelection(selection) {
  const normalized = normalizeTemplateSelection(selection);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(COLLECTION_PROMPT_TEMPLATE_STORAGE_KEY, JSON.stringify(normalized));
  }
  return normalized;
}

export function clearStoredCollectionPromptTemplateSelection() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(COLLECTION_PROMPT_TEMPLATE_STORAGE_KEY);
  }
  return getEmptyCollectionTemplateSelection();
}

const ADDITIONAL_COLLECTION_DESCRIPTION_TEMPLATES = [
  {
    id: "col-conversion-focused",
    name: "Conversion-Focused Collection",
    category: "Marketing & Sales",
    description: "Guides shoppers from interest to browsing with clear value and next steps.",
    template:
      "Write a conversion-focused collection description (120-190 words).\n- Open with the strongest buying reason for this collection.\n- Explain who the collection is best for and why.\n- Highlight 3 practical benefits customers can compare while browsing.\n- Include one trust signal, policy reassurance, or support note.\n- Close with a clear browse-and-choose call to action.",
  },
  {
    id: "col-compatibility-range",
    name: "Compatibility Range",
    category: "Technical & Specs",
    description: "Explains fit, compatibility, and specification ranges across a collection.",
    template:
      "Write a compatibility-focused collection description (120-190 words).\n- Start with the systems, sizes, models, or uses this collection supports.\n- Explain how shoppers should compare specifications across products.\n- List 4 compatibility checks or technical details to review.\n- Mention documentation, support, or warranty when relevant.\n- Use clear, factual language for confident selection.",
  },
  {
    id: "col-performance-comparison",
    name: "Performance Comparison",
    category: "Technical & Specs",
    description: "Helps shoppers compare performance tiers and technical tradeoffs.",
    template:
      "Write a performance-focused collection description (130-200 words).\n- Open with the performance goal this collection is built around.\n- Compare entry, mid, and premium options in the collection.\n- Include measurable attributes such as speed, capacity, durability, output, or efficiency.\n- Explain which shopper need matches each performance tier.\n- Keep the tone precise, useful, and specification-led.",
  },
  {
    id: "col-spec-buyer-guide",
    name: "Specification Buyer Guide",
    category: "Technical & Specs",
    description: "Turns collection specs into a practical buying guide.",
    template:
      "Write a specification buyer guide collection description (130-210 words).\n- Open with the key decision buyers need to make.\n- Break down 4 important specs and what each one means in real use.\n- Mention compatibility, installation, care, or maintenance requirements.\n- Include a recommendation for beginners and advanced buyers.\n- Use a helpful expert tone without hype.",
  },
  {
    id: "col-room-use-case-styling",
    name: "Room & Use-Case Styling",
    category: "Lifestyle & Emotion",
    description: "Connects the collection to spaces, routines, and visual style.",
    template:
      "Write a lifestyle collection description (120-190 words) based on room, routine, or use case.\n- Open with a real-life scene where the collection fits naturally.\n- Explain how the products work together visually or functionally.\n- Include 3 styling, pairing, or routine ideas.\n- Mention mood, comfort, convenience, or personal expression.\n- End with an invitation to build the right look or setup.",
  },
  {
    id: "col-everyday-essentials",
    name: "Everyday Essentials",
    category: "Lifestyle & Emotion",
    description: "Positions collection items as practical daily favorites.",
    template:
      "Write an everyday essentials collection description (110-180 words).\n- Start with the daily need this collection solves.\n- Show how the products simplify routines or improve comfort.\n- Highlight 3 everyday scenarios where shoppers will use these items.\n- Include durability, ease of care, portability, or versatility when relevant.\n- Use warm, simple, shopper-friendly language.",
  },
  {
    id: "col-travel-outdoor-lifestyle",
    name: "Travel & Outdoor Lifestyle",
    category: "Lifestyle & Emotion",
    description: "Frames the collection around movement, travel, and active use.",
    template:
      "Write a travel or outdoor lifestyle collection description (130-200 words).\n- Open with a scene of movement, travel, or outdoor use.\n- Explain how the collection supports freedom, convenience, or readiness.\n- List 3 product qualities that matter on the go.\n- Mention weather, packing, comfort, or reliability when relevant.\n- Close with an energetic browse invitation.",
  },
  {
    id: "col-size-variant-guide",
    name: "Size & Variant Guide",
    category: "Product Categories",
    description: "Explains product types, sizes, variants, and shopper choice.",
    template:
      "Write a collection description (120-190 words) that helps shoppers choose between product types or variants.\n- Open with the range of choices available in the collection.\n- Explain 3-5 sizes, styles, formats, or variants and who each suits.\n- Include fit, capacity, material, color, or use-case guidance when relevant.\n- Mention how to compare options quickly.\n- End with a helpful selection prompt.",
  },
  {
    id: "col-curated-luxury",
    name: "Curated Luxury",
    category: "Brands & Luxury",
    description: "Presents the collection as carefully selected and refined.",
    template:
      "Write a curated luxury collection description (130-210 words).\n- Open with the curation standard behind the collection.\n- Highlight craftsmanship, material quality, finish, or design restraint.\n- Describe 3 refined details shoppers should notice.\n- Mention scarcity, exclusivity, or elevated service only when relevant.\n- Use polished, confident language without exaggeration.",
  },
  {
    id: "col-heritage-craft",
    name: "Heritage Craft",
    category: "Brands & Luxury",
    description: "Emphasizes tradition, makers, provenance, and craft quality.",
    template:
      "Write a heritage craft collection description (140-220 words).\n- Begin with the craft tradition, workshop, or design heritage behind the collection.\n- Explain techniques, finishing steps, or quality checks used across the products.\n- Highlight 3 details that show individual character or long-term value.\n- Include material sourcing or provenance when available.\n- Use a respectful, craftsmanship-led tone.",
  },
  {
    id: "col-premium-materials",
    name: "Premium Materials",
    category: "Brands & Luxury",
    description: "Focuses on material origin, rarity, and quality standards.",
    template:
      "Write a premium materials collection description (120-190 words).\n- Lead with the strongest material story across the collection.\n- Explain sourcing, origin, grade, or quality standards.\n- List 3 material advantages shoppers can feel, see, or rely on.\n- Mention sustainability or ethical sourcing when applicable.\n- Keep the tone sophisticated and knowledgeable.",
  },
  {
    id: "col-holiday-seasonal",
    name: "Holiday Seasonal Collection",
    category: "Seasonal & Events",
    description: "Targets holiday shopping, gifting, and seasonal browsing.",
    template:
      "Write a holiday seasonal collection description (120-190 words).\n- Open with the holiday, seasonal moment, or shopping occasion.\n- Connect the collection to gifting, hosting, travel, celebration, or preparation.\n- Highlight 3 seasonal benefits or product groups.\n- Mention delivery, availability, packaging, or deadlines when relevant.\n- Close with a timely browse invitation.",
  },
  {
    id: "col-event-ready",
    name: "Event-Ready Collection",
    category: "Seasonal & Events",
    description: "Positions the collection around events, launches, campaigns, and occasions.",
    template:
      "Write an event-ready collection description (120-190 words).\n- Start with the event, campaign, or occasion this collection supports.\n- Explain how the products help shoppers prepare or stand out.\n- Include 3 event-specific use cases, pairings, or must-have details.\n- Add urgency only if availability is actually limited.\n- Use timely, confident, occasion-aware language.",
  },
];

const ADDITIONAL_COLLECTION_META_DESCRIPTION_TEMPLATES = [
  {
    id: "col-md-luxury-curation",
    name: "Luxury Curation",
    category: "Brands & Luxury",
    description: "Highlights refined curation, quality, and premium collection standards.",
    template:
      "Write a collection meta description under 155 characters.\n- Lead with premium curation or craftsmanship.\n- Include the collection name and one quality differentiator.\n- Keep it refined and accurate.",
  },
  {
    id: "col-md-heritage-quality",
    name: "Heritage Quality",
    category: "Brands & Luxury",
    description: "Adds provenance, heritage, or artisan quality to collection search snippets.",
    template:
      "Write a heritage-focused collection meta description under 155 characters.\n- Mention craft, provenance, or quality standards.\n- Include one concrete benefit.\n- Avoid inflated claims.",
  },
  {
    id: "col-md-premium-materials",
    name: "Premium Materials",
    category: "Brands & Luxury",
    description: "Promotes material quality and sourcing in a concise snippet.",
    template:
      "Write a premium materials collection meta description under 155 characters.\n- Include material quality, origin, or finish.\n- Add the main shopper benefit.\n- Use polished language.",
  },
  {
    id: "col-md-lifestyle-routine",
    name: "Lifestyle Routine",
    category: "Lifestyle & Emotion",
    description: "Connects collection benefits to everyday routines and experiences.",
    template:
      "Write a lifestyle collection meta description under 155 characters.\n- Open with a daily routine or use case.\n- Include the collection name and emotional or practical benefit.\n- Keep it natural.",
  },
  {
    id: "col-md-style-moment",
    name: "Style Moment",
    category: "Lifestyle & Emotion",
    description: "Frames the collection around style, mood, and customer moments.",
    template:
      "Write a style-led collection meta description under 155 characters.\n- Mention the occasion, mood, or space.\n- Include one clear reason to browse.\n- Make it warm and specific.",
  },
  {
    id: "col-md-seasonal-event",
    name: "Seasonal Event",
    category: "Seasonal & Events",
    description: "Targets seasonal campaigns, launches, and limited-time shopping intent.",
    template:
      "Write a seasonal collection meta description under 155 characters.\n- Include the season, event, or holiday.\n- Mention availability or timely benefit.\n- Keep urgency factual.",
  },
  {
    id: "col-md-holiday-gifting",
    name: "Holiday Gifting",
    category: "Seasonal & Events",
    description: "Targets holiday gift shoppers with concise collection value.",
    template:
      "Write a holiday gift collection meta description under 155 characters.\n- Include recipient, occasion, or gifting need.\n- Mention variety, delivery, or packaging if relevant.\n- End with a browse cue.",
  },
  {
    id: "col-md-limited-drop",
    name: "Limited Drop",
    category: "Seasonal & Events",
    description: "Creates accurate urgency for limited drops or seasonal availability.",
    template:
      "Write a limited-drop collection meta description under 155 characters.\n- Mention limited availability only if true.\n- Include the collection name and key benefit.\n- Keep it clear and credible.",
  },
];

const ADDITIONAL_COLLECTION_META_TITLE_TEMPLATES = [
  {
    id: "col-mt-seo-category-keyword",
    name: "SEO Category Keyword",
    category: "SEO Optimized",
    description: "Combines collection name with the strongest category search term.",
    template:
      "Write a collection meta title (50-65 characters).\n- Include the collection name and primary category keyword.\n- Keep the keyword near the beginning.\n- Avoid repeated words.",
  },
  {
    id: "col-mt-search-intent",
    name: "Search Intent",
    category: "SEO Optimized",
    description: "Targets buyer intent with concise keyword phrasing.",
    template:
      "Write a search-intent collection meta title (50-65 characters).\n- Match the title to what shoppers search for.\n- Include collection name plus one buyer-intent phrase.\n- Keep it readable and direct.",
  },
  {
    id: "col-mt-luxury-edit",
    name: "Luxury Edit",
    category: "Brands & Luxury",
    description: "Signals premium curation and refined brand positioning.",
    template:
      "Write a luxury collection meta title (50-65 characters).\n- Pair the collection name with a refined quality phrase.\n- Use words like premium, curated, artisan, or luxury only when accurate.\n- Keep it elegant and concise.",
  },
  {
    id: "col-mt-heritage-craft",
    name: "Heritage Craft",
    category: "Brands & Luxury",
    description: "Highlights craft, provenance, or heritage in a short title.",
    template:
      "Write a heritage craft collection meta title (50-65 characters).\n- Include the collection name and a craft or provenance keyword.\n- Keep the phrase polished and factual.\n- Avoid excessive punctuation.",
  },
  {
    id: "col-mt-premium-material",
    name: "Premium Material",
    category: "Brands & Luxury",
    description: "Uses material quality as the main title differentiator.",
    template:
      "Write a premium material collection meta title (50-65 characters).\n- Include the collection name and top material keyword.\n- Add brand name only if space allows.\n- Keep it refined and specific.",
  },
  {
    id: "col-mt-lifestyle-use-case",
    name: "Lifestyle Use Case",
    category: "Lifestyle & Emotion",
    description: "Targets the customer lifestyle or use-case behind the collection.",
    template:
      "Write a lifestyle collection meta title (50-65 characters).\n- Include the collection name and a real use case.\n- Use 'for [occasion/use]' when it reads naturally.\n- Keep it shopper-focused.",
  },
  {
    id: "col-mt-everyday-routine",
    name: "Everyday Routine",
    category: "Lifestyle & Emotion",
    description: "Frames the collection around daily use and routine benefits.",
    template:
      "Write an everyday routine collection meta title (50-65 characters).\n- Include the collection name and a daily benefit.\n- Keep the wording simple, useful, and easy to scan.",
  },
  {
    id: "col-mt-style-mood",
    name: "Style Mood",
    category: "Lifestyle & Emotion",
    description: "Connects the collection to mood, look, room, or personal style.",
    template:
      "Write a style-focused collection meta title (50-65 characters).\n- Include the collection name and one style or mood keyword.\n- Keep it descriptive without sounding promotional.",
  },
  {
    id: "col-mt-event-ready",
    name: "Event Ready",
    category: "Seasonal & Events",
    description: "Targets occasion, campaign, and event-specific title searches.",
    template:
      "Write an event-ready collection meta title (50-65 characters).\n- Include the event, holiday, or season plus collection name.\n- Keep urgency factual and concise.",
  },
];

const IMAGE_MATCH_COLLECTION_DESCRIPTION_TEMPLATES = [
  {
    id: "col-brand-signature-curation",
    name: "Brand Signature Curation",
    category: "Brands & Luxury",
    description: "Connects the collection to brand identity, taste, and curated standards.",
    template:
      "Write a brand-signature collection description (130-210 words).\n- Open with the brand point of view behind this collection.\n- Explain how the products reflect signature style, standards, or customer promise.\n- Highlight 3 details that make the collection feel carefully curated.\n- Mention quality, service, or exclusivity only when accurate.\n- Use refined, brand-led language.",
  },
  {
    id: "col-private-client-edit",
    name: "Private Client Edit",
    category: "Brands & Luxury",
    description: "Frames the collection as a polished edit for discerning buyers.",
    template:
      "Write a private-client style collection description (140-220 words).\n- Begin with the type of buyer this collection serves.\n- Position the collection as a selective edit, not a broad assortment.\n- Include craftsmanship, finish, provenance, or presentation details.\n- Explain how shoppers can choose between pieces in the edit.\n- Maintain a quiet, premium tone.",
  },
  {
    id: "col-editorial-compliance",
    name: "Editorial Compliance",
    category: "Compliance & Accuracy",
    description: "Keeps collection copy accurate, clear, and platform-safe.",
    template:
      "Write a compliant collection description (120-190 words).\n- Use proper grammar, spelling, and punctuation.\n- Avoid excessive capitalization, symbols, unsupported claims, and promotional exaggeration.\n- Focus on collection scope, product types, materials, sizes, or compatibility.\n- Include only accurate, verifiable details.\n- Keep the tone professional and clear.",
  },
  {
    id: "col-factual-specification",
    name: "Factual Specification",
    category: "Compliance & Accuracy",
    description: "Uses verified facts and avoids vague collection claims.",
    template:
      "Write a factual collection description (130-210 words).\n- State what product types are included in the collection.\n- Include verified specifications such as sizes, materials, colors, capacities, or compatibility.\n- Avoid vague phrases like premium quality unless supported by details.\n- Note what shoppers should check before buying.\n- Use neutral, information-first language.",
  },
  {
    id: "col-return-expectations",
    name: "Return Expectation Clarity",
    category: "Compliance & Accuracy",
    description: "Reduces returns by setting clear expectations across the collection.",
    template:
      "Write a collection description (130-210 words) that supports clear customer expectations.\n- Explain product variation, fit, sizing, compatibility, or included items.\n- Highlight details shoppers should review before ordering.\n- Include care, use, or setup guidance when relevant.\n- Avoid ambiguous or misleading language.\n- Help the customer choose confidently.",
  },
  {
    id: "col-safety-use-guidance",
    name: "Safety & Use Guidance",
    category: "Compliance & Accuracy",
    description: "Adds safety, usage, and certification context for sensitive collections.",
    template:
      "Write a safety-aware collection description (120-200 words).\n- Mention relevant safety standards, certifications, age guidance, or use limitations when applicable.\n- Describe proper use and important precautions.\n- Avoid unsupported safety or health claims.\n- Help shoppers understand which product is suitable for their need.\n- Use careful, factual wording.",
  },
  {
    id: "col-transparent-availability",
    name: "Transparent Availability",
    category: "Compliance & Accuracy",
    description: "Avoids misleading pricing, urgency, and availability statements.",
    template:
      "Write a transparent collection description (120-190 words).\n- Do not mention specific prices, discounts, or limited-time claims unless provided.\n- Focus on product value, specifications, and genuine differences.\n- Clearly describe what is available in the collection.\n- Avoid superlatives unless factually supported.\n- Keep the copy accurate and shopper-friendly.",
  },
  {
    id: "col-claims-verification",
    name: "Claims Verification",
    category: "Compliance & Accuracy",
    description: "Ensures collection copy avoids unsupported performance or quality claims.",
    template:
      "Write a verified-claims collection description (130-210 words).\n- Include only claims that can be supported by product data or store policy.\n- Replace vague praise with concrete attributes.\n- Mention certifications, testing, warranty, or standards only when available.\n- Explain collection differences in objective terms.\n- Use a precise, credible tone.",
  },
  {
    id: "col-everyday-scene",
    name: "Everyday Scene",
    category: "Lifestyle & Emotion",
    description: "Builds an emotional scene around how shoppers use the collection.",
    template:
      "Write an emotion-forward collection description (120-190 words).\n- Open with a specific everyday moment where the collection fits.\n- Connect product choices to comfort, confidence, ease, or enjoyment.\n- Include 3 sensory or practical details shoppers can imagine.\n- Keep the products grounded in real use.\n- End with a warm browse invitation.",
  },
  {
    id: "col-family-memory",
    name: "Family Memory",
    category: "Lifestyle & Emotion",
    description: "Frames the collection around shared moments and lasting memories.",
    template:
      "Write a family-focused collection description (140-220 words).\n- Open with a warm family scene or tradition.\n- Explain how the collection supports shared routines, gifting, hosting, or milestones.\n- Include 3 examples of family use or memory-making.\n- Mention durability, comfort, or ease of care when relevant.\n- Use inclusive, warm language.",
  },
  {
    id: "col-upsell-bundle",
    name: "Bundle & Upsell",
    category: "Marketing & Sales",
    description: "Positions the collection as a smart bundle or complementary set.",
    template:
      "Write a bundle-style collection description (120-190 words).\n- Explain what product types work well together in this collection.\n- Frame the value of buying complementary items together.\n- Include 3 pairing ideas or complete-set benefits.\n- Mention savings, convenience, or coordination only when accurate.\n- End with a simple shop-the-set prompt.",
  },
  {
    id: "col-abandoned-browse",
    name: "Abandoned Browse Recovery",
    category: "Marketing & Sales",
    description: "Gently brings shoppers back to products they considered.",
    template:
      "Write a gentle recovery collection description (120-180 words).\n- Reference shoppers who are still deciding between options.\n- Reassure them with practical reasons to return to the collection.\n- Address common concerns such as fit, durability, shipping, or compatibility.\n- Keep urgency soft and helpful.\n- End with an easy continue-browsing cue.",
  },
  {
    id: "col-flash-campaign",
    name: "Flash Campaign",
    category: "Marketing & Sales",
    description: "Creates timely campaign energy without inventing false urgency.",
    template:
      "Write a campaign-focused collection description (110-180 words).\n- Lead with the campaign, sale, or featured shopping moment.\n- Highlight the strongest value or benefit in the collection.\n- List 3 product groups or reasons to browse now.\n- Add urgency only if the sale or availability is confirmed.\n- Use energetic, action-oriented language.",
  },
  {
    id: "col-loyalty-members",
    name: "Loyalty Member Collection",
    category: "Marketing & Sales",
    description: "Highlights member value, rewards, or exclusive collection benefits.",
    template:
      "Write a loyalty-focused collection description (130-210 words).\n- Open with the benefit for returning customers or members.\n- Explain how this collection helps members earn, save, or access better choices.\n- Include 3 perks, product advantages, or shopping conveniences.\n- Mention member-only access only if true.\n- End with a clear browse or sign-in cue.",
  },
  {
    id: "col-referral-shopping",
    name: "Referral Shopping",
    category: "Marketing & Sales",
    description: "Encourages shoppers to share a collection with friends or teams.",
    template:
      "Write a referral-friendly collection description (120-190 words).\n- Explain why this collection is easy to recommend.\n- Mention who the shopper could share it with and why.\n- Include 3 benefits that make the collection giftable, useful, or broadly appealing.\n- Add referral rewards only if provided.\n- Use friendly, community-focused language.",
  },
  {
    id: "col-shopify-category-page",
    name: "Shopify Collection Page",
    category: "Marketplace & Channel",
    description: "Creates a Shopify-ready collection page description.",
    template:
      "Write a Shopify collection page description (120-180 words).\n- Start with a short benefit-led intro.\n- Include 4 concise bullets covering product types, materials, sizing, or use cases.\n- Add a fit, care, compatibility, or delivery note when relevant.\n- End with a clear browsing reassurance line.",
  },
  {
    id: "col-amazon-storefront",
    name: "Amazon Storefront Collection",
    category: "Marketplace & Channel",
    description: "Adapts collection copy for Amazon-style browsing and objections.",
    template:
      "Write an Amazon-style collection description (130-210 words).\n- Open with a clear shopper benefit.\n- Include 5 benefit bullets covering materials, sizing, compatibility, durability, or warranty.\n- Address common objections such as fit, setup, or reliability.\n- Keep claims factual and easy to scan.",
  },
  {
    id: "col-etsy-marketplace",
    name: "Etsy Marketplace Collection",
    category: "Marketplace & Channel",
    description: "Uses maker story, customization, and handmade context for collections.",
    template:
      "Write an Etsy-optimized collection description (150-240 words).\n- Open with the maker story or inspiration behind the collection.\n- Explain handmade process, materials, or small-batch details.\n- Include customization or personalization options if available.\n- Add care, shipping, or packaging details.\n- Use warm, authentic, maker-to-buyer language.",
  },
  {
    id: "col-ebay-category-lot",
    name: "eBay Category Lot",
    category: "Marketplace & Channel",
    description: "Creates transparent marketplace copy for collection-style lots or groups.",
    template:
      "Write an eBay-style collection or lot description (150-240 words).\n- Start with condition and authenticity notes.\n- Include product types, quantities, measurements, and included items.\n- List flaws, wear, or exclusions honestly when applicable.\n- Add shipping, returns, and payment policy notes.\n- Use detailed, seller-credibility language.",
  },
  {
    id: "col-category-buyer-guide",
    name: "Category Buyer Guide",
    category: "Product Categories",
    description: "Guides shoppers through a product category in collection form.",
    template:
      "Write a category buyer guide collection description (140-220 words).\n- Open with what shoppers need to know before choosing.\n- Explain 4 category differences such as size, material, use case, compatibility, or price tier.\n- Recommend which product type fits which shopper need.\n- Include a practical comparison cue.\n- Keep the tone helpful and category-aware.",
  },
  {
    id: "col-niche-category",
    name: "Niche Category",
    category: "Product Categories",
    description: "Explains a specialized collection for targeted shoppers.",
    template:
      "Write a niche category collection description (130-200 words).\n- Define the specific product niche or subcategory.\n- Explain who needs this collection and why.\n- Include 3 specialized features, materials, or compatibility points.\n- Clarify what makes this collection different from broader categories.\n- End with a targeted browse prompt.",
  },
  {
    id: "col-cross-category",
    name: "Cross-Category Collection",
    category: "Product Categories",
    description: "Explains mixed collections with multiple product types.",
    template:
      "Write a cross-category collection description (130-210 words).\n- Open with why these different product types belong together.\n- Group the collection into 3 logical shopper needs or use cases.\n- Explain how products can be compared or combined.\n- Mention compatibility, style matching, or complete solutions when relevant.\n- Keep the structure easy to scan.",
  },
  {
    id: "col-seo-category-hub",
    name: "SEO Category Hub",
    category: "SEO Optimized",
    description: "Builds collection copy around primary and secondary category keywords.",
    template:
      "Write an SEO-optimized collection description (150-240 words).\n- Use the primary category keyword in the first 1-2 sentences.\n- Blend 3-5 secondary keywords naturally.\n- Include scannable bullets for collection features or product groups.\n- Avoid keyword stuffing.\n- End with a soft browse call to action.",
  },
  {
    id: "col-long-tail-seo",
    name: "Long-Tail SEO",
    category: "SEO Optimized",
    description: "Targets specific shopper searches and question-based collection intent.",
    template:
      "Write a long-tail SEO collection description (160-250 words).\n- Target phrases like \"best [category] for [use]\" or \"how to choose [category]\" naturally.\n- Include question-based keywords that match buyer intent.\n- Address pain points, comparison needs, and selection criteria.\n- Use semantic keywords throughout.\n- End with a clear next step.",
  },
  {
    id: "col-local-seo",
    name: "Local SEO Collection",
    category: "SEO Optimized",
    description: "Adds location-based intent for local collection searches.",
    template:
      "Write a local SEO collection description (140-220 words).\n- Include city, region, delivery zone, pickup area, or service area when provided.\n- Mention local shopping needs, availability, or community relevance.\n- Add nearby delivery, pickup, or support details only when accurate.\n- Use location phrases naturally.\n- Keep the copy helpful and local.",
  },
  {
    id: "col-featured-snippet",
    name: "Featured Snippet Collection",
    category: "SEO Optimized",
    description: "Structures collection copy to answer search questions quickly.",
    template:
      "Write a featured-snippet optimized collection description (150-220 words).\n- Start by answering a common category question directly.\n- Use bullets or numbered points for selection criteria.\n- Include what to compare, what to avoid, and who each option suits.\n- Keep the first 2-3 sentences high value.\n- End with additional browsing context.",
  },
  {
    id: "col-comparison-seo",
    name: "Comparison SEO",
    category: "SEO Optimized",
    description: "Targets alternative and comparison searches for collection pages.",
    template:
      "Write a comparison-focused SEO collection description (170-260 words).\n- Address \"vs\" and \"alternative to\" search intent naturally.\n- Compare product types, materials, features, or tiers in the collection.\n- Include specific differentiators and shopper decision points.\n- Avoid unsupported competitor claims.\n- End with a clear value summary.",
  },
  {
    id: "col-back-to-school",
    name: "Back-to-School Collection",
    category: "Seasonal & Events",
    description: "Frames the collection for school-year preparation.",
    template:
      "Write a back-to-school collection description (140-220 words).\n- Capture fresh-start energy and preparation.\n- Include organization, durability, confidence, or academic success themes.\n- Mention parent and student needs when relevant.\n- Highlight 3 product groups or use cases.\n- End with a ready-for-school browse prompt.",
  },
  {
    id: "col-fathers-day",
    name: "Father's Day Collection",
    category: "Seasonal & Events",
    description: "Creates collection copy for Father's Day gift shoppers.",
    template:
      "Write a Father's Day collection description (130-210 words).\n- Celebrate appreciation, usefulness, and thoughtful gifting.\n- Include different father figures or recipient types.\n- Highlight 3 gift categories or product benefits.\n- Mention packaging or delivery only when relevant.\n- End with a warm gifting cue.",
  },
  {
    id: "col-mothers-day",
    name: "Mother's Day Collection",
    category: "Seasonal & Events",
    description: "Creates collection copy for Mother's Day shopping.",
    template:
      "Write a Mother's Day collection description (140-220 words).\n- Open with appreciation, care, or everyday love.\n- Explain why the collection suits thoughtful gifting.\n- Include 3 product groups, personal touches, or practical benefits.\n- Add delivery or gift-ready notes only if true.\n- End with a sincere browse invitation.",
  },
  {
    id: "col-summer-seasonal",
    name: "Summer Seasonal Collection",
    category: "Seasonal & Events",
    description: "Highlights summer use cases and seasonal benefits.",
    template:
      "Write a summer collection description (130-200 words).\n- Capture summer energy, travel, outdoor living, or warm-weather routines.\n- Include seasonal benefits such as portability, cooling, comfort, durability, or UV support when relevant.\n- Highlight 3 summer scenarios.\n- End with an upbeat seasonal browsing prompt.",
  },
  {
    id: "col-valentines",
    name: "Valentine's Day Collection",
    category: "Seasonal & Events",
    description: "Frames the collection around romance and relationship gifting.",
    template:
      "Write a Valentine's Day collection description (150-230 words).\n- Set a warm romantic or thoughtful gift-giving scene.\n- Focus on connection, personal meaning, and shared moments.\n- Highlight 3 gift ideas, product benefits, or presentation details.\n- Mention personalization or delivery only if available.\n- End with a love-focused browse cue.",
  },
  {
    id: "col-social-caption",
    name: "Social-Ready Collection",
    category: "Social & UGC",
    description: "Creates punchy collection copy for social captions.",
    template:
      "Write a social-ready collection caption (70-130 words).\n- Start with a scroll-stopping hook.\n- Add 3-4 short benefit bullets.\n- Mention the collection's strongest visual or use-case appeal.\n- End with a nudge to save, share, or browse.\n- Use emojis lightly only if appropriate for the brand.",
  },
  {
    id: "col-tiktok-viral",
    name: "TikTok Collection Hook",
    category: "Social & UGC",
    description: "Creates short-form social copy for collection discovery.",
    template:
      "Write a TikTok-style collection description (40-90 words).\n- Use a quick hook that stops the scroll.\n- Reference a relatable shopping moment, trend, or problem.\n- Mention 2-3 collection benefits or product groups.\n- Keep the tone native to short-form social content.\n- End with a simple browse cue.",
  },
  {
    id: "col-instagram-stories",
    name: "Instagram Stories Collection",
    category: "Social & UGC",
    description: "Adapts collection copy for mobile stories and interactive prompts.",
    template:
      "Write an Instagram Stories collection description (50-90 words).\n- Start with a hook or question.\n- Include story-friendly calls to action such as tap, vote, DM, or shop.\n- Mention one interactive prompt like poll, quiz, or question sticker.\n- Keep it punchy and mobile-scannable.",
  },
  {
    id: "col-behind-scenes",
    name: "Behind the Scenes Collection",
    category: "Social & UGC",
    description: "Shows process, sourcing, or team story behind the collection.",
    template:
      "Write a behind-the-scenes collection description (120-180 words).\n- Share the creation, sourcing, buying, or curation process.\n- Include team, founder, maker, or buyer insight when available.\n- Explain one challenge or decision behind the collection.\n- Connect the process to customer value.\n- End with community-focused language.",
  },
  {
    id: "col-influencer-edit",
    name: "Influencer Edit",
    category: "Social & UGC",
    description: "Frames a collection around creator picks or social proof.",
    template:
      "Write an influencer-edit collection description (100-160 words).\n- Reference creator picks, stylist choices, or community favorites only if provided.\n- Explain why the collection is easy to share or recommend.\n- Include 3 standout product qualities or looks.\n- Add social proof without inventing follower counts or testimonials.\n- End with a browse-the-edit cue.",
  },
  {
    id: "col-ugc-community",
    name: "UGC Community Collection",
    category: "Social & UGC",
    description: "Encourages customers to share collection purchases and styling.",
    template:
      "Write a UGC-focused collection description (90-150 words).\n- Encourage customers to share photos, videos, reviews, or styling ideas.\n- Include a campaign hashtag placeholder if available.\n- Mention customer favorites or community use cases.\n- Add incentive language only if provided.\n- Use inclusive, community-building wording.",
  },
  {
    id: "col-industrial-equipment",
    name: "Industrial Equipment Collection",
    category: "Technical & Specs",
    description: "Creates professional collection copy for technical equipment ranges.",
    template:
      "Write an industrial equipment collection description (170-260 words).\n- Lead with equipment type and primary applications.\n- Include performance specifications, capacity, safety features, or certifications.\n- Explain installation, maintenance, or service considerations.\n- Help buyers compare models by workload or environment.\n- Use precise professional language.",
  },
  {
    id: "col-software-technical",
    name: "Software Technical Collection",
    category: "Technical & Specs",
    description: "Explains software products, plans, or integrations in a collection.",
    template:
      "Write a software technical collection description (170-260 words).\n- Start with primary use cases and target users.\n- Cover compatibility, integrations, APIs, security, or system requirements.\n- Compare feature tiers or product options.\n- Mention documentation, support, or SLA details when relevant.\n- Use technical but accessible language.",
  },
  {
    id: "col-casual-friendly",
    name: "Casual & Friendly",
    category: "Tone & Style",
    description: "Uses simple, approachable language for collection browsing.",
    template:
      "Write a casual, friendly collection description (100-170 words).\n- Use contractions and simple language.\n- Focus on everyday benefits and ease of choosing.\n- Include 3-5 bullets with clear shopper wins.\n- End with a helpful nudge, not a hard sell.",
  },
  {
    id: "col-clean-minimalist",
    name: "Clean Minimalist",
    category: "Tone & Style",
    description: "Keeps collection copy short, direct, and understated.",
    template:
      "Write a clean minimalist collection description (80-130 words).\n- Use simple, direct language.\n- Focus on the collection's core function and essential benefits.\n- Avoid unnecessary adjectives and marketing superlatives.\n- Include only the most important product differences.\n- End with a straightforward value statement.",
  },
  {
    id: "col-narrative-story",
    name: "Narrative Storytelling",
    category: "Tone & Style",
    description: "Turns the collection into a short shopper-centered story.",
    template:
      "Write a narrative collection description (170-260 words).\n- Start with a relatable scene or shopper challenge.\n- Introduce the collection as the solution within the story.\n- Include sensory details and practical product roles.\n- Build toward a clear transformation or outcome.\n- End with an emotional payoff and browse cue.",
  },
  {
    id: "col-witty-humorous",
    name: "Witty & Humorous",
    category: "Tone & Style",
    description: "Adds light humor while preserving product clarity.",
    template:
      "Write a witty collection description (110-180 words).\n- Use clever, light humor related to the shopping need.\n- Keep product benefits clear and useful.\n- Include 3 practical reasons to browse the collection.\n- Avoid jokes that obscure facts or sound off-brand.\n- End with a memorable but helpful line.",
  },
  {
    id: "col-millennial-focused",
    name: "Millennial-Focused",
    category: "Tone & Style",
    description: "Uses modern, practical language for value-conscious shoppers.",
    template:
      "Write a millennial-focused collection description (120-190 words).\n- Address a real-life situation or modern pain point.\n- Use authentic language without corporate phrasing.\n- Mention value, sustainability, convenience, or wellness when relevant.\n- Connect the collection to work-life balance or daily routines.\n- End with values-aligned wording.",
  },
  {
    id: "col-sophisticated-luxury-tone",
    name: "Sophisticated Luxury Tone",
    category: "Tone & Style",
    description: "Uses elevated language while keeping collection details clear.",
    template:
      "Write a sophisticated luxury collection description (160-250 words).\n- Use refined vocabulary and elegant pacing.\n- Emphasize curation, craftsmanship, material quality, or heritage.\n- Keep the tone confident without being excessive.\n- Include concrete details that justify the luxury positioning.\n- End with understated appeal.",
  },
  {
    id: "col-corporate-professional",
    name: "Corporate Professional",
    category: "Tone & Style",
    description: "Creates formal, outcome-oriented collection copy.",
    template:
      "Write a corporate professional collection description (150-230 words).\n- Use formal, credible language.\n- Focus on business outcomes, efficiency, compliance, or ROI when relevant.\n- Include specific metrics, standards, or operational benefits if provided.\n- Structure information clearly for decision makers.\n- End with implementation or support reassurance.",
  },
  {
    id: "col-warm-service",
    name: "Warm Service Tone",
    category: "Tone & Style",
    description: "Balances helpful guidance with friendly brand service.",
    template:
      "Write a warm service-focused collection description (110-180 words).\n- Start with a helpful shopper need.\n- Explain how the collection makes choosing easier.\n- Include 3 guidance points such as fit, use case, pairing, or care.\n- Keep the language friendly and reassuring.\n- End with support-oriented wording.",
  },
  {
    id: "col-expert-advisor",
    name: "Expert Advisor Tone",
    category: "Tone & Style",
    description: "Sounds knowledgeable and consultative for guided shopping.",
    template:
      "Write an expert-advisor collection description (140-220 words).\n- Open with the key decision shoppers should make.\n- Explain what an expert would compare across this collection.\n- Include 4 practical selection criteria.\n- Avoid hype; use confident, useful guidance.\n- End with a clear recommendation framework.",
  },
  {
    id: "col-editorial-magazine",
    name: "Editorial Magazine Tone",
    category: "Tone & Style",
    description: "Uses polished editorial copy for curated collections.",
    template:
      "Write an editorial collection description (140-220 words).\n- Open with a strong editorial angle or trend insight.\n- Explain why the collection has been curated now.\n- Include 3 notable details, looks, or product directions.\n- Keep the tone polished, observant, and useful.\n- End with a refined browsing invitation.",
  },
  {
    id: "col-direct-informational",
    name: "Direct Informational Tone",
    category: "Tone & Style",
    description: "Keeps the collection copy plain, factual, and easy to scan.",
    template:
      "Write a direct informational collection description (100-160 words).\n- State what the collection includes.\n- Explain who it is for and how to choose.\n- Include 3-5 concise facts about materials, sizes, compatibility, or uses.\n- Avoid promotional wording.\n- End with a clear next step.",
  },
];

const COLLECTION_META_DESCRIPTION_CATEGORY_TEMPLATES = [
  {
    id: "col-md-compliance-accuracy",
    name: "Compliance & Accuracy Meta",
    category: "Compliance & Accuracy",
    description: "Keeps collection snippets factual and clear.",
    template:
      "Write a compliant collection meta description under 155 characters.\n- Include accurate collection scope, product types, or key specs.\n- Avoid unsupported claims, misleading urgency, and excessive punctuation.\n- Keep it useful and factual.",
  },
  {
    id: "col-md-marketplace-channel",
    name: "Marketplace Channel Meta",
    category: "Marketplace & Channel",
    description: "Creates a marketplace-friendly collection snippet.",
    template:
      "Write a marketplace-ready collection meta description under 155 characters.\n- Mention product range, key benefit, and one practical buying detail.\n- Address fit, compatibility, shipping, condition, or customization when relevant.\n- Keep it scannable.",
  },
  {
    id: "col-md-product-category",
    name: "Product Category Meta",
    category: "Product Categories",
    description: "Explains the collection category and shopper choice clearly.",
    template:
      "Write a category-focused collection meta description under 155 characters.\n- Include the collection category and main product types.\n- Mention one selection factor such as size, material, style, or use case.\n- End with a browse cue.",
  },
  {
    id: "col-md-seo-optimized",
    name: "SEO Optimized Meta",
    category: "SEO Optimized",
    description: "Targets collection search intent with concise keyword usage.",
    template:
      "Write an SEO collection meta description under 155 characters.\n- Use the primary category keyword naturally.\n- Add one secondary keyword or buyer-intent phrase.\n- Include a clear benefit without keyword stuffing.",
  },
  {
    id: "col-md-social-ugc",
    name: "Social & UGC Meta",
    category: "Social & UGC",
    description: "Uses community, styling, or review appeal for collection snippets.",
    template:
      "Write a social-ready collection meta description under 155 characters.\n- Mention customer favorites, styling ideas, reviews, or community use only if provided.\n- Include one shareable collection benefit.\n- Keep it credible.",
  },
  {
    id: "col-md-technical-specs",
    name: "Technical Specs Meta",
    category: "Technical & Specs",
    description: "Highlights technical collection details in search snippets.",
    template:
      "Write a technical collection meta description under 155 characters.\n- Include product type and one measurable spec, compatibility point, certification, or performance detail.\n- Keep the wording precise and useful.",
  },
  {
    id: "col-md-tone-style",
    name: "Tone & Style Meta",
    category: "Tone & Style",
    description: "Matches collection meta copy to a chosen brand voice.",
    template:
      "Write a collection meta description under 155 characters in the selected brand tone.\n- Tone options: casual, luxury, professional, minimalist, witty, or friendly.\n- Include the collection benefit and one concrete detail.",
  },
];

const COLLECTION_META_TITLE_CATEGORY_TEMPLATES = [
  {
    id: "col-mt-compliance-accuracy",
    name: "Accurate Collection Title",
    category: "Compliance & Accuracy",
    description: "Uses factual collection details without exaggerated title claims.",
    template:
      "Write a factual collection meta title (50-65 characters).\n- Include the collection name and one verifiable detail such as material, size, use, or compatibility.\n- Avoid unsupported superlatives and urgency.",
  },
  {
    id: "col-mt-marketplace-channel",
    name: "Marketplace Collection Title",
    category: "Marketplace & Channel",
    description: "Creates a marketplace-style title for collection browsing.",
    template:
      "Write a marketplace-ready collection meta title (50-65 characters).\n- Include collection name, product category, and one practical buying keyword.\n- Keep it readable for Shopify, Amazon, Etsy, or eBay style browsing.",
  },
  {
    id: "col-mt-product-category",
    name: "Product Category Title",
    category: "Product Categories",
    description: "Targets category-based collection searches.",
    template:
      "Write a product-category collection meta title (50-65 characters).\n- Include the collection name and main category keyword.\n- Add size, style, material, or use-case wording only if relevant.\n- Keep it concise.",
  },
  {
    id: "col-mt-social-ugc",
    name: "Social Proof Collection Title",
    category: "Social & UGC",
    description: "Adds social or community appeal to collection titles.",
    template:
      "Write a social-proof collection meta title (50-65 characters).\n- Pair the collection name with customer favorite, top-rated, creator edit, or community-loved wording only if accurate.\n- Keep it credible.",
  },
  {
    id: "col-mt-technical-specs",
    name: "Technical Collection Title",
    category: "Technical & Specs",
    description: "Uses specification-led keywords for technical collection searches.",
    template:
      "Write a technical collection meta title (50-65 characters).\n- Include collection name and one specification, compatibility, performance, or certification keyword.\n- Keep the phrase precise and searchable.",
  },
  {
    id: "col-mt-tone-style",
    name: "Tone & Style Collection Title",
    category: "Tone & Style",
    description: "Matches collection title phrasing to a selected brand voice.",
    template:
      "Write a collection meta title (50-65 characters) in the selected tone.\n- Tone options: casual, luxury, professional, minimalist, witty, or friendly.\n- Include the collection name and one clear benefit.",
  },
];

const COLLECTION_META_DESCRIPTION_TOP_UP_CATEGORIES = [
  { slug: "compliance-accuracy", category: "Compliance & Accuracy" },
  { slug: "marketplace-channel", category: "Marketplace & Channel" },
  { slug: "product-categories", category: "Product Categories" },
  { slug: "seo-optimized", category: "SEO Optimized" },
  { slug: "social-ugc", category: "Social & UGC" },
  { slug: "technical-specs", category: "Technical & Specs" },
  { slug: "tone-style", category: "Tone & Style" },
];

const COLLECTION_META_TITLE_TOP_UP_CATEGORIES = COLLECTION_META_DESCRIPTION_TOP_UP_CATEGORIES.filter(
  ({ slug }) => slug !== "seo-optimized",
);

const COLLECTION_META_DESCRIPTION_TOP_UP_TEMPLATES = COLLECTION_META_DESCRIPTION_TOP_UP_CATEGORIES.flatMap(
  ({ slug, category }) => [
    {
      id: `col-md-${slug}-intent-match`,
      name: `${category} Intent Match`,
      category,
      description: `Matches collection meta description copy to ${category.toLowerCase()} search intent.`,
      template:
        `Write a collection meta description under 155 characters for the ${category} angle.\n- Include the collection name or primary category keyword.\n- Match buyer intent quickly.\n- Add one concrete collection benefit.\n- Avoid generic filler.`,
    },
    {
      id: `col-md-${slug}-range-detail`,
      name: `${category} Range Detail`,
      category,
      description: `Highlights one specific collection detail for ${category.toLowerCase()} shoppers.`,
      template:
        `Write a collection meta description under 155 characters for the ${category} category.\n- Mention product range, use case, material, compatibility, proof, or style.\n- Make the collection easy to understand at a glance.\n- Keep it accurate.`,
    },
    {
      id: `col-md-${slug}-browse-trust`,
      name: `${category} Browse Trust`,
      category,
      description: `Builds confidence before shoppers open a ${category.toLowerCase()} collection.`,
      template:
        `Write a trust-building collection meta description under 155 characters for the ${category} angle.\n- Include one selection cue, policy reassurance, review, standard, or practical benefit when available.\n- End with a clear browse reason.`,
    },
  ],
);

const COLLECTION_META_TITLE_TOP_UP_TEMPLATES = COLLECTION_META_TITLE_TOP_UP_CATEGORIES.flatMap(
  ({ slug, category }) => [
    {
      id: `col-mt-${slug}-keyword-focus`,
      name: `${category} Keyword Focus`,
      category,
      description: `Creates a search-ready collection meta title for ${category.toLowerCase()} intent.`,
      template:
        `Write a collection meta title (50-65 characters) for the ${category} angle.\n- Include the collection name and one high-intent category keyword.\n- Put the searchable phrase near the beginning.\n- Keep it readable.`,
    },
    {
      id: `col-mt-${slug}-benefit-focus`,
      name: `${category} Benefit Focus`,
      category,
      description: `Pairs collection name with a concise ${category.toLowerCase()} benefit.`,
      template:
        `Write a collection meta title (50-65 characters).\n- Pair the collection name with one concise ${category} benefit or differentiator.\n- Avoid repeated words and unsupported claims.\n- Keep it factual and click-worthy.`,
    },
    {
      id: `col-mt-${slug}-buyer-fit`,
      name: `${category} Buyer Fit`,
      category,
      description: `Targets the right buyer, use case, or browsing context for ${category.toLowerCase()}.`,
      template:
        `Write a collection meta title (50-65 characters) for a specific buyer or use case.\n- Include the collection name.\n- Add a short phrase for who it is for, what it solves, or where it fits.\n- Match the ${category} category.`,
    },
  ],
);

export const COLLECTION_DESCRIPTION_TEMPLATES = [
  {
    id: "col-problem-solution",
    name: "Problem-Solution",
    description: "Shows how collections solve specific customer problems.",
    template:
      "Write a collection description (100–180 words) using a problem-solution framework.\n- Open with the common frustration customers face when searching for products in this category.\n- Position this collection as the organised solution to that frustration.\n- Highlight 3 types of products or solution features within the collection.\n- Include a trust signal or proof point.\n- Close with a clear browsing call to action.\n- Tone: empathetic, direct, and solution-focused.",
  },
  {
    id: "col-technical-specifications",
    name: "Technical Specifications",
    description: "Emphasizes detailed specs for product groups.",
    template:
      "Write a technical collection description (100–180 words) for specification-conscious buyers.\n- Open with the collection's technical scope and primary purpose.\n- State the range of specifications covered across products in the collection.\n- List 3–5 key technical parameters that differentiate products in this range.\n- Include compatibility or integration details relevant to the category.\n- Use precise, accurate language appropriate for a technical audience.\n- Tone: factual, precise, and authoritative.",
  },
  {
    id: "col-lifestyle-integration",
    name: "Lifestyle Integration",
    description: "Illustrates how product groups enhance customer experiences.",
    template:
      "Write a lifestyle-driven collection description (100–170 words) connecting the collection to everyday life.\n- Open with an evocative scenario tied to the lifestyle this collection supports.\n- Highlight the emotional and practical benefits of the collection as a whole.\n- List 3 lifestyle moments or use cases this collection serves.\n- Emphasise how the collection fits different occasions or seasons.\n- Close with a browsing invitation.\n- Tone: aspirational, warm, and relatable.",
  },
  {
    id: "col-eco-friendly-product",
    name: "Eco-Friendly Product",
    description: "Highlights sustainability benefits across responsible collections.",
    template:
      "Write a sustainability-focused collection description (100–170 words) for eco-conscious shoppers.\n- Open with a bold sustainability statement for the collection.\n- Identify the environmental values this collection represents.\n- Highlight 3 sustainable materials, processes, or certifications across the products.\n- Include a measurable environmental impact or third-party certification.\n- Close with a values-aligned call to action.\n- Tone: responsible, transparent, and mission-driven.",
  },
  {
    id: "col-premium-luxury-product",
    name: "Premium/Luxury Product",
    description: "Showcases craftsmanship and exclusivity for luxury collections.",
    template:
      "Write a premium collection description (100–170 words) that communicates luxury and exclusivity.\n- Open with a statement of craftsmanship, provenance, or curation standards.\n- Reference premium materials, heritage, or exclusive sourcing.\n- Highlight 3 luxury attributes that define this collection.\n- Include a reference to exclusivity, rarity, or limited curation.\n- Close with a prestige-aligned browsing invitation.\n- Tone: elevated, authoritative, and brand-prestige-driven.",
  },
  {
    id: "col-budget-friendly-product",
    name: "Budget-Friendly Product",
    description: "Emphasizes quality and durability despite affordable pricing.",
    template:
      "Write a value-focused collection description (100–170 words) for price-conscious shoppers.\n- Open with a strong value proposition for the collection as a whole.\n- Reassure on quality despite accessible pricing.\n- List 3 essential product features or attributes that deliver real-world usefulness.\n- Include a cost-effectiveness or savings context.\n- Close with an encouraging browsing call to action.\n- Tone: honest, practical, and confidence-building.",
  },
  {
    id: "col-seasonal-limited-edition",
    name: "Seasonal/Limited Edition",
    description: "Creates urgency for time-limited or seasonal collections.",
    template:
      "Write a seasonal or limited-edition collection description (100–170 words) with urgency and occasion relevance.\n- Open with the seasonal or limited-edition framing.\n- Connect the collection to a specific season, trend, or occasion.\n- Highlight 3 products or features exclusive to this edition.\n- Include a scarcity or availability signal.\n- Close with an urgency-driven browsing call to action.\n- Tone: timely, exclusive, and action-oriented.",
  },
  {
    id: "col-collection-comparison",
    name: "Collection Comparison",
    description: "Contrasts collection advantages directly against market alternatives.",
    template:
      "Write a comparison-focused collection description (100–180 words) to help buyers choose between options.\n- Open by acknowledging the buyer's need to compare before deciding.\n- Describe the range of products and what differentiates them within this collection.\n- List 3–5 comparison dimensions: price, performance, materials, or use case.\n- Guide the buyer toward the right choice based on their primary need.\n- Close with a helpful recommendation and browsing call to action.\n- Tone: helpful, structured, and confidence-building.",
  },
  {
    id: "col-gift-guide",
    name: "Gift Guide",
    description: "Positions collection as the go-to destination for gifts and special occasions.",
    template:
      "Write a gift-guide collection description (100–170 words) for occasion-driven shoppers.\n- Open with the occasion or recipient profile this collection serves.\n- Explain why this collection makes memorable, well-received gifts.\n- List 3 gift categories or standout products within the collection.\n- Include packaging, delivery, or personalisation notes.\n- Close with an occasion-relevant call to action.\n- Tone: warm, celebratory, and gift-focused.",
  },
  {
    id: "col-new-arrivals",
    name: "New Arrivals / Trending",
    description: "Creates excitement and freshness for newly launched or trending collections.",
    template:
      "Write an engaging new-arrivals collection description (100–160 words) that creates excitement.\n- Open by announcing the arrival of new products in clear, energetic terms.\n- Highlight what makes this new selection worth exploring right now.\n- List 3 new products, categories, or innovation highlights.\n- Create light urgency around early availability or limited quantity.\n- Close with a discovery-driven browsing invitation.\n- Tone: fresh, energetic, and discovery-driven.",
  },
  {
    id: "col-bestsellers-curated",
    name: "Bestsellers / Editor's Picks",
    description: "Leverages social proof and editorial authority to guide shoppers.",
    template:
      "Write a bestseller-led collection description (100–160 words) built around popularity and proven value.\n- Open with a social proof statement: customer count, rating, or sales milestone.\n- Explain why this curated selection is trusted by customers.\n- Highlight 3 top-performing products or product types in the collection.\n- Include a trust-building signal: rating, returns policy, or satisfaction guarantee.\n- Close with a confident browsing call to action.\n- Tone: confident, community-validated, and reassuring.",
  },
  ...ADDITIONAL_COLLECTION_DESCRIPTION_TEMPLATES,
  ...IMAGE_MATCH_COLLECTION_DESCRIPTION_TEMPLATES,
];

export const COLLECTION_META_DESCRIPTION_TEMPLATES = [
  {
    id: "col-md-benefit-focused",
    name: "Benefit-Focused",
    description: "Highlights primary benefits and value proposition for customers.",
    template:
      "Write a collection meta description (130–155 characters) that leads with the primary benefit.\n- State the main benefit the collection delivers for the customer.\n- Add the unique value proposition in plain, direct language.\n- End with a browsing invitation or call to action.",
  },
  {
    id: "col-md-problem-solution",
    name: "Problem-Solution",
    description: "Positions collection as solution to customer pain points.",
    template:
      "Write a collection meta description (130–155 characters) using a problem-solution format.\n- Frame the customer problem in 5–8 words.\n- Position the collection as the direct solution.\n- Include a secondary benefit.\n- End with a availability or urgency note.",
  },
  {
    id: "col-md-quality-centric",
    name: "Quality-Centric",
    description: "Emphasizes high-quality materials and craftsmanship.",
    template:
      "Write a collection meta description (130–155 characters) that leads with quality.\n- Lead with a quality adjective and the collection name.\n- State what quality means for this collection: materials, process, or standard.\n- Add the primary use scenario.\n- Include a differentiator or trust signal.",
  },
  {
    id: "col-md-experience",
    name: "Experience",
    description: "Describes the experience customers gain from the collection.",
    template:
      "Write a collection meta description (130–155 characters) focused on customer experience.\n- Open with an experience verb: \"Experience\", \"Discover\", or \"Enjoy\".\n- Describe what that experience feels or looks like.\n- Reference the product attribute that delivers it.\n- End with a social proof or guarantee note.",
  },
  {
    id: "col-md-occasion-based",
    name: "Occasion-Based",
    description: "Highlights specific scenarios where collection excels.",
    template:
      "Write a collection meta description (130–155 characters) tied to a specific occasion or use case.\n- Open with \"Perfect for [occasion]\" framing.\n- Name the collection and its key attribute.\n- Add a special offer or availability note if relevant.",
  },
  {
    id: "col-md-discovery",
    name: "Discovery",
    description: "Creates excitement through collection exploration.",
    template:
      "Write a collection meta description (130–155 characters) that creates curiosity.\n- Open with a discovery invitation: \"Discover\" or \"Explore\".\n- Name the collection and its standout highlight.\n- Add what the customer gains by exploring it.\n- End with a curiosity-building statement.",
  },
  {
    id: "col-md-new-arrivals",
    name: "New Arrivals",
    description: "Drives clicks for freshly launched or trending collections.",
    template:
      "Write a collection meta description (130–155 characters) for new arrivals.\n- Signal freshness: \"Shop our latest\" or \"Just arrived\".\n- Name the collection and highlight the newest feature or style.\n- End with a call to action: \"Shop now!\" or \"Be first to explore.\"",
  },
  {
    id: "col-md-gift-guide",
    name: "Gift Guide",
    description: "Targets gift-intent searches for specific occasions or recipients.",
    template:
      "Write a collection meta description (130–155 characters) for gift-intent searches.\n- Open with \"Find the perfect gift\" and name the collection.\n- Describe the occasion or recipient this collection serves.\n- Note variety, price range, or delivery option.\n- End with a gifting call to action.",
  },
  {
    id: "col-md-bestsellers",
    name: "Bestsellers",
    description: "Leverages popularity and social proof to encourage clicks.",
    template:
      "Write a collection meta description (130–155 characters) led by social proof.\n- Open with \"Shop our top-selling\" and name the collection.\n- Reference the customer count or segment that trusts it.\n- State the key benefit.\n- Include a social proof signal: rating or review.",
  },
  ...ADDITIONAL_COLLECTION_META_DESCRIPTION_TEMPLATES,
  ...COLLECTION_META_DESCRIPTION_CATEGORY_TEMPLATES,
  ...COLLECTION_META_DESCRIPTION_TOP_UP_TEMPLATES,
];

export const COLLECTION_META_TITLE_TEMPLATES = [
  {
    id: "col-mt-benefit-first",
    name: "Benefit First",
    description: "Leads with customer outcome then collection title.",
    template:
      "Write a collection meta title (50–65 characters) that leads with the primary benefit.\n- Put the main customer benefit or outcome first.\n- Separate from the collection name with a pipe character.\n- Format: \"Main Benefit | Collection Name\"\n- Stay within 65 characters.",
  },
  {
    id: "col-mt-category-seo",
    name: "Category SEO",
    description: "Targets category keyword relevance for search.",
    template:
      "Write a collection meta title (50–65 characters) optimised for category search.\n- Include the collection name and the primary category keyword.\n- Add \"Collection\" to reinforce the browse intent.\n- Format: \"Collection Name Category Keyword Collection\"",
  },
  {
    id: "col-mt-shop-intent",
    name: "Shop Intent",
    description: "Adds shopping intent phrasing with concise value.",
    template:
      "Write a collection meta title (50–65 characters) targeting shopping intent.\n- Open with \"Shop\" followed by the collection name.\n- Add a pipe and a concise value phrase.\n- Format: \"Shop Collection Name | Value Phrase\"",
  },
  {
    id: "col-mt-quality-focus",
    name: "Quality Focus",
    description: "Highlights quality positioning and trust.",
    template:
      "Write a collection meta title (50–65 characters) that signals premium quality.\n- Add a quality adjective before the collection name.\n- Separate with a pipe and the brand name.\n- Format: \"Quality Adjective Collection Name | Brand\"",
  },
  {
    id: "col-mt-occasion",
    name: "Occasion Match",
    description: "Optimized for use-case and occasion-based searches.",
    template:
      "Write a collection meta title (50–65 characters) tied to a use-case or occasion.\n- Lead with the collection name.\n- Follow with \"for [occasion keyword]\".\n- Format: \"Collection Name for Occasion Keyword\"",
  },
  {
    id: "col-mt-problem-solution",
    name: "Problem-Solution",
    description: "Frames collection as direct solution-oriented choice.",
    template:
      "Write a collection meta title (50–65 characters) targeting problem-based search.\n- Frame the solution keyword in verb form.\n- Use \"with [collection name]\" to connect solution to collection.\n- Format: \"Solve [Problem] with Collection Name\"",
  },
  {
    id: "col-mt-seasonal",
    name: "Seasonal",
    description: "Highlights seasonal or campaign relevance.",
    template:
      "Write a collection meta title (50–65 characters) for seasonal or campaign relevance.\n- Lead with the seasonal or campaign phrase.\n- Separate with a pipe and the collection name.\n- Format: \"Seasonal Phrase | Collection Name\"",
  },
  {
    id: "col-mt-featured",
    name: "Featured Angle",
    description: "Uses top feature keyword and brand confidence.",
    template:
      "Write a collection meta title (50–65 characters) featuring the top product attribute.\n- Lead with the collection name.\n- Add a dash and the top feature keyword.\n- Separate with a pipe and the brand name.\n- Format: \"Collection Name – Top Feature | Brand\"",
  },
  {
    id: "col-mt-new-arrivals",
    name: "New Arrivals",
    description: "Signals freshness and new product availability.",
    template:
      "Write a collection meta title (50–65 characters) for new arrivals.\n- Open with \"New\" before the collection name.\n- Separate with a pipe and the brand name.\n- Format: \"New Collection Name | Brand\"",
  },
  {
    id: "col-mt-gift-guide",
    name: "Gift Guide",
    description: "Targets gift-intent keyword searches.",
    template:
      "Write a collection meta title (50–65 characters) for gift-intent searches.\n- Lead with the collection name.\n- Add \"Gift Guide\" and an occasion keyword.\n- Format: \"Collection Name Gift Guide | Occasion\"",
  },
  {
    id: "col-mt-bestsellers",
    name: "Bestsellers",
    description: "Uses popularity signal to build click trust.",
    template:
      "Write a collection meta title (50–65 characters) using a bestseller signal.\n- Open with \"Best-Selling\" followed by the collection name.\n- Separate with a pipe and the brand name.\n- Format: \"Best-Selling Collection Name | Brand\"",
  },
  ...ADDITIONAL_COLLECTION_META_TITLE_TEMPLATES,
  ...COLLECTION_META_TITLE_CATEGORY_TEMPLATES,
  ...COLLECTION_META_TITLE_TOP_UP_TEMPLATES,
];
