export const PRODUCT_PROMPT_TEMPLATE_STORAGE_KEY = "product_prompt_template_selection_v1";

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

export function getEmptyTemplateSelection() {
  return { ...EMPTY_TEMPLATE_SELECTION };
}

export function readStoredProductPromptTemplateSelection() {
  if (typeof window === "undefined") return getEmptyTemplateSelection();

  try {
    const raw = window.localStorage.getItem(PRODUCT_PROMPT_TEMPLATE_STORAGE_KEY);
    if (!raw) return getEmptyTemplateSelection();
    return normalizeTemplateSelection(JSON.parse(raw));
  } catch {
    return getEmptyTemplateSelection();
  }
}

export function writeStoredProductPromptTemplateSelection(selection) {
  const normalized = normalizeTemplateSelection(selection);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PRODUCT_PROMPT_TEMPLATE_STORAGE_KEY, JSON.stringify(normalized));
  }
  return normalized;
}

export function clearStoredProductPromptTemplateSelection() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(PRODUCT_PROMPT_TEMPLATE_STORAGE_KEY);
  }
  return getEmptyTemplateSelection();
}

export const PRODUCT_DESCRIPTION_TEMPLATES = [
  {
    id: "problem-solution",
    name: "Problem-Solution",
    description: "Shows how the product solves a specific customer pain point with clear before-and-after framing.",
    template:
      "[Identify common customer pain point]\n[Explain daily impact of that problem]\n[Introduce product as the solution]\n[Solution feature 1]\n[Solution feature 2]\n[Solution feature 3]\n[Testimonial or proof point]\n[Call to action with benefit reinforcement]\nKey features and benefits: Solutions and Results",
  },
  {
    id: "technical-specifications",
    name: "Technical Specifications",
    description: "Lists key specs and performance metrics with precision, ideal for tech-savvy shoppers.",
    template:
      "[Product name and category]\n[Brief technical overview in 1-2 sentences]\n[Key specification 1 with measurement or rating]\n[Key specification 2 with measurement or rating]\n[Key specification 3 with measurement or rating]\n[Key specification 4 with measurement or rating]\n[Key specification 5 with measurement or rating]\n[Paragraph comparing to industry standards or alternatives]\nKey features and benefits: Precision and Performance",
  },
  {
    id: "lifestyle-integration",
    name: "Lifestyle Integration",
    description: "Connects the product to the customer's everyday lifestyle with emotional and practical benefits.",
    template:
      "[Evocative scenario where product fits customer lifestyle]\n[Emotional benefit]\n[Practical benefit]\n[Lifestyle enhancement 1]\n[Lifestyle enhancement 2]\n[Lifestyle enhancement 3]\n[Versatility highlight]\n[Social proof element]\nKey features and benefits: Lifestyle and Versatility",
  },
  {
    id: "eco-friendly-product",
    name: "Eco-Friendly Product",
    description: "Highlights sustainability, eco-certifications, and ethical sourcing for conscious consumers.",
    template:
      "[Sustainability statement about product]\n[Environmental problem the product helps address]\n[How product is made sustainably]\n[Eco-friendly material/process 1]\n[Eco-friendly material/process 2]\n[Eco-friendly material/process 3]\n[End-of-life considerations]\n[Certification or measurable environmental impact]\nKey features and benefits: Sustainability and Responsibility",
  },
  {
    id: "premium-luxury-product",
    name: "Premium/Luxury Product",
    description: "Emphasises exclusivity, craftsmanship, and prestige for high-end product positioning.",
    template:
      "[Exclusivity statement]\n[Heritage or craftsmanship highlight]\n[Premium materials description]\n[Luxury feature/detail 1]\n[Luxury feature/detail 2]\n[Luxury feature/detail 3]\n[Status or prestige element]\n[Limited availability or special edition information]\nKey features and benefits: Exclusivity and Prestige",
  },
  {
    id: "budget-friendly-product",
    name: "Budget-Friendly Product",
    description: "Focuses on value, affordability, and cost savings without compromising on quality signals.",
    template:
      "[Value proposition statement]\n[Cost-effectiveness highlight]\n[Quality assurance despite lower price]\n[Essential feature 1]\n[Essential feature 2]\n[Essential feature 3]\n[Cost comparison or savings highlight]\n[Long-term value explanation]\nKey features and benefits: Value and Affordability",
  },
  {
    id: "seasonal-limited-edition",
    name: "Seasonal/Limited Edition",
    description: "Creates urgency around seasonal relevance or limited availability to drive immediate action.",
    template:
      "[Seasonal relevance or limited-time offer]\n[Unique aspects for this edition]\n[Connection to trend, holiday, or occasion]\n[Special feature 1 for this edition]\n[Special feature 2 for this edition]\n[Special feature 3 for this edition]\n[Collectibility or exclusivity factor]\n[Urgency creator: limited availability]\nKey features and benefits: Uniqueness and Timeliness",
  },
  {
    id: "storytelling-narrative",
    name: "Storytelling Narrative",
    description: "Builds brand connection through the product's origin story and craftsmanship journey.",
    template:
      "[Origin story: why this product was created]\n[Problem or inspiration behind it]\n[Journey from concept to finished product]\n[Unique craftsmanship or design detail]\n[How it has helped real customers]\n[Key feature 1 rooted in story]\n[Key feature 2 rooted in story]\n[Invitation to become part of the story]\nKey features and benefits: Story and Connection",
  },
  {
    id: "social-proof-focus",
    name: "Social Proof Focus",
    description: "Leads with customer trust, reviews, and popularity signals to boost buyer confidence.",
    template:
      "[Opening with customer praise or usage milestone]\n[Key reason customers love this product]\n[Top reviewed feature 1]\n[Top reviewed feature 2]\n[Top reviewed feature 3]\n[Who it is trusted by: audience segment]\n[Rating or award highlight if available]\n[Call to action reinforcing popularity]\nKey features and benefits: Trust and Popularity",
  },
  {
    id: "gift-occasion",
    name: "Gift & Occasion",
    description: "Positions the product as a memorable gift for special occasions with recipient-focused language.",
    template:
      "[Occasion statement: birthday, anniversary, holiday, etc.]\n[Why this product makes a memorable gift]\n[Who it is perfect for: recipient profile]\n[Giftable feature 1]\n[Giftable feature 2]\n[Packaging or presentation detail]\n[Personalisation or customisation option if available]\n[Urgency: order in time for occasion]\nKey features and benefits: Gifting and Occasion",
  },
  {
    id: "competitive-differentiation",
    name: "Competitive Differentiation",
    description: "Highlights what sets this product apart from alternatives with direct comparison language.",
    template:
      "[Common frustration with ordinary alternatives]\n[How this product is fundamentally different]\n[Advantage 1 vs. the standard option]\n[Advantage 2 vs. the standard option]\n[Advantage 3 vs. the standard option]\n[Verified proof point or test result]\n[Who makes the switch and why]\n[Call to action: upgrade today]\nKey features and benefits: Differentiation and Value",
  },
  {
    id: "tone-professional",
    name: "Professional Tone",
    description: "Formal, professional tone for B2B, enterprise, or premium product audiences.",
    template:
      "[Tone: Write in a formal, professional tone throughout]\n[Product name and formal purpose statement]\n[Technical capability or quality specification]\n[Feature 1 described with precision and clarity]\n[Feature 2 described with measurable benefit]\n[Feature 3 described with professional context]\n[Compliance, certification, or reliability assurance]\n[Professional-grade application or industry use case]\n[Formal closing call to action]\nKey features and benefits: Professional Quality",
  },
  {
    id: "tone-friendly",
    name: "Friendly & Casual Tone",
    description: "Warm, conversational tone that speaks directly to everyday consumer shoppers.",
    template:
      "[Tone: Write in a warm, friendly, conversational tone throughout]\n[Relatable opening that speaks directly to the reader]\n[Why customers genuinely love it]\n[What makes everyday use better — first point]\n[What makes everyday use better — second point]\n[Easy-to-understand outcome or benefit]\n[Who it is perfect for in casual language]\n[Easy, inviting call to action]\nKey features and benefits: Everyday Value",
  },
  {
    id: "tone-persuasive",
    name: "Persuasive & Sales-Focused",
    description: "Bold, sales-driven tone with urgency and social proof to maximise conversions.",
    template:
      "[Tone: Write in a bold, persuasive, sales-driven tone throughout]\n[Powerful opening claim that grabs immediate attention]\n[Key problem this product solves with urgency framing]\n[Strongest differentiator 1 with immediate benefit]\n[Strongest differentiator 2 with immediate benefit]\n[Social proof, reviews, or customer milestone]\n[Risk reversal: money-back, warranty, or satisfaction guarantee]\n[Strong CTA with urgency or scarcity element]\nKey features and benefits: Conversion and Value",
  },
  {
    id: "tone-informational",
    name: "Informational / Technical",
    description: "Clear, factual tone for technical or data-focused products requiring specification accuracy.",
    template:
      "[Tone: Write in a clear, factual, informational tone throughout]\n[Product category and primary functional purpose]\n[Key technical specification 1 with unit of measurement]\n[Key technical specification 2 with unit of measurement]\n[Key technical specification 3 with unit of measurement]\n[Compatibility, integration, or certification detail]\n[Performance benchmark or validated test data]\n[Recommended professional use case or application context]\nKey features and benefits: Specifications and Accuracy",
  },
];

export const PRODUCT_META_DESCRIPTION_TEMPLATES = [
  {
    id: "md-basic-benefit",
    name: "Basic Benefit",
    description: "Simple benefit-led meta description under 155 characters for broad appeal.",
    template:
      "{product_title} - {extract_main_benefit_from_description}. {extract_secondary_feature_from_description}. Shop now!",
  },
  {
    id: "md-problem-solution",
    name: "Problem-Solution",
    description: "Addresses a customer problem and positions the product as the solution.",
    template:
      "Solve {extract_problem_from_description} with {product_title}. {extract_key_feature_from_description}. Shop now!",
  },
  {
    id: "md-feature-promo",
    name: "Feature-Promo",
    description: "Combines two key product features with a promotional call-to-action.",
    template:
      "{product_title}: {extract_primary_feature_from_description} & {extract_secondary_feature_from_description}. {detect_promotional_element_if_exists}. Buy today!",
  },
  {
    id: "md-premium-quality",
    name: "Premium Quality",
    description: "Highlights premium materials and quality craftsmanship for luxury positioning.",
    template:
      "Premium {product_title} made with {extract_material_or_quality_indicators}. {extract_main_benefit_from_description}. Order now!",
  },
  {
    id: "md-target-audience",
    name: "Target Audience",
    description: "Speaks directly to the ideal customer segment to improve click-through rate.",
    template:
      "Perfect for {extract_target_audience_from_description}: {product_title} delivers {extract_main_benefit_from_description}. Shop today!",
  },
  {
    id: "md-value-proposition",
    name: "Value Proposition",
    description: "Emphasises affordability and value for money with a clear offer statement.",
    template:
      "{product_title}: {extract_main_benefit_from_description} at an affordable price. {detect_promotional_element_if_exists}. Get yours now!",
  },
  {
    id: "md-experience-based",
    name: "Experience-Based",
    description: "Focuses on the experience the product delivers using aspirational language.",
    template:
      "Experience {extract_main_benefit_from_description} with {product_title}. {extract_secondary_benefit_from_description}. Shop now!",
  },
  {
    id: "md-feature-to-benefit",
    name: "Feature-to-Benefit",
    description: "Converts a product feature into a clear, tangible customer benefit.",
    template:
      "{product_title} with {extract_key_feature_from_description} for {convert_feature_to_benefit}. Try it today!",
  },
  {
    id: "md-usage-occasion",
    name: "Usage Occasion",
    description: "Links the product to a specific use case or moment to improve relevance.",
    template:
      "{product_title}: Perfect for {extract_usage_occasion_from_description}. {extract_key_feature_from_description}. Shop now!",
  },
  {
    id: "md-elevation",
    name: "Elevation",
    description: "Elevates the product's perceived value with aspirational, upgrade-focused language.",
    template:
      "Elevate {extract_use_case_from_description} with {product_title}. {extract_key_benefit_from_description}. Order today!",
  },
  {
    id: "md-discovery",
    name: "Discovery",
    description: "Creates curiosity and urgency with scarcity language to drive immediate clicks.",
    template:
      "Discover {extract_unique_advantage_from_description} in {product_title}. {extract_secondary_benefit}. Limited stock!",
  },
  {
    id: "md-variety-options",
    name: "Variety Options",
    description: "Highlights the range of options or variants available to match different needs.",
    template:
      "{product_title} in {extract_varieties_or_options} for {extract_main_purpose_from_description}. {extract_unique_quality}. Order today!",
  },
  {
    id: "md-guarantee-assurance",
    name: "Guarantee & Assurance",
    description: "Builds trust with guarantees and risk-reversal signals to reduce purchase hesitation.",
    template:
      "{product_title}: {extract_main_benefit_from_description}. {guarantee_or_return_policy}. Risk-free — {trust_signal}. Shop today!",
  },
  {
    id: "md-gift-occasion",
    name: "Gift Occasion",
    description: "Frames the product as a perfect gift for specific occasions to capture gift shoppers.",
    template:
      "The perfect {occasion_keyword} gift: {product_title}. {extract_main_benefit_from_description}. {delivery_or_packaging_note}.",
  },
  {
    id: "md-social-proof",
    name: "Social Proof",
    description: "Leverages customer trust signals, ratings, and reviews to boost CTR.",
    template:
      "Loved by {customer_count_or_segment}: {product_title} delivers {extract_main_benefit_from_description}. {rating_or_review_signal}. Shop now!",
  },
];

export const PRODUCT_META_TITLE_TEMPLATES = [
  {
    id: "mt-benefit-first",
    name: "Benefit First",
    description: "Leads with the main benefit before the product name to capture benefit-driven searches.",
    template: "{main_benefit} | {product_title}",
  },
  {
    id: "mt-product-feature",
    name: "Product + Feature",
    description: "Pairs the product name with its primary feature for feature-driven search queries.",
    template: "{product_title} - {primary_feature}",
  },
  {
    id: "mt-intent-buy-now",
    name: "Buy Intent",
    description: "Targets high-purchase-intent search queries with 'Buy' action words.",
    template: "Buy {product_title} | {primary_benefit}",
  },
  {
    id: "mt-category-seo",
    name: "Category SEO",
    description: "Optimised for category-based search terms with brand name inclusion.",
    template: "{product_title} {category_keyword} | {brand_name}",
  },
  {
    id: "mt-problem-solution",
    name: "Problem-Solution",
    description: "Targets problem-based search queries to capture customers seeking solutions.",
    template: "{solve_problem_keyword} with {product_title}",
  },
  {
    id: "mt-quality-value",
    name: "Quality + Value",
    description: "Signals both quality and great value to attract price-conscious shoppers.",
    template: "{product_title} - Quality at Great Value",
  },
  {
    id: "mt-usage-occasion",
    name: "Usage Occasion",
    description: "Matches the product to a specific use occasion for contextual search targeting.",
    template: "{product_title} for {usage_occasion}",
  },
  {
    id: "mt-promo",
    name: "Promo Ready",
    description: "Includes a promotional phrase to drive higher click-through rates.",
    template: "{product_title} | {promo_phrase}",
  },
  {
    id: "mt-review-signal",
    name: "Review Signal",
    description: "Adds social proof signals like ratings to boost CTR from search results.",
    template: "{product_title} - {rating_or_review_count} | {primary_benefit}",
  },
  {
    id: "mt-best-for-audience",
    name: "Best For Audience",
    description: "Targets a specific audience segment to improve relevance for niche searches.",
    template: "Best {product_title} for {target_audience}",
  },
  {
    id: "mt-gift-intent",
    name: "Gift Intent",
    description: "Targets gift-shopping search queries for occasion-based purchases.",
    template: "{product_title} - Perfect Gift for {occasion_or_recipient}",
  },
];
