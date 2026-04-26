import { useState } from "react";

const DOMAINS = [
  {
    id: "social",
    label: "Social & Relational",
    icon: "◎",
    color: "#6B9FD4",
    description: "Impact on real-world relationships and social functioning",
    questions: [
      "Has the patient reduced contact with friends, family, or support networks since beginning AI use?",
      "Does the patient report preferring the AI's company or communication style over human interaction?",
      "Has the patient begun using the AI as a primary vehicle for processing interpersonal conflicts (rather than direct communication)?",
      "Is there evidence that the AI is being used to rehearse or script social interactions to an extent that impairs authentic relating?",
      "Has the patient disclosed to significant others that they are in a 'relationship' with or emotionally dependent on an AI?",
    ],
    vulnerabilities: {
      "Autism Spectrum Disorder": "High risk: AI may reinforce preference for predictable, non-judgmental interaction; social withdrawal may be framed as progress.",
      "Borderline Personality Disorder": "High risk: Intense attachment to AI mirroring idealisation; absence of rupture-repair cycles prevents relational learning.",
      "Social Anxiety Disorder": "Moderate risk: AI use as avoidance behaviour entrenches the anxiety loop rather than resolving it.",
      "Schizophrenia": "Moderate risk: Social impoverishment worsens negative symptoms; AI cannot substitute for social cognition development.",
      "Depression (severe)": "Moderate risk: Withdrawal reinforcement; AI interaction may reduce the activation cost perceived by the patient, enabling deeper retreat.",
    },
  },
  {
    id: "emotional",
    label: "Emotional Regulation",
    icon: "◑",
    color: "#C47FBF",
    description: "Impact on affect regulation, coping strategies, and emotional dependency",
    questions: [
      "Does the patient report distress, anxiety, or dysregulation when unable to access the AI?",
      "Has the patient's use of other coping strategies (grounding, peer support, therapy exercises) decreased since starting AI use?",
      "Does the patient seek reassurance from the AI repeatedly for the same fear or intrusive thought without resolution?",
      "Does the patient describe the AI as 'understanding them' in a way that no human can?",
      "Has the patient become emotionally activated by AI interactions in ways they did not anticipate (e.g. feeling rejected when the AI refuses, grief when a chat is lost)?",
    ],
    vulnerabilities: {
      "OCD": "Very high risk: AI is ideally suited to provide reassurance-compulsions at scale; will dramatically worsen ERP non-compliance.",
      "Borderline Personality Disorder": "High risk: AI provides infinite emotional availability that real relationships cannot match; distorts expectations.",
      "Generalised Anxiety Disorder": "High risk: Repeated reassurance-seeking without habituation maintains anxiety long-term.",
      "PTSD": "Moderate risk: May be used as emotional numbing or avoidance of trauma processing; can delay engagement with trauma-focused therapy.",
      "Bipolar Disorder (depressive phase)": "Moderate risk: Passive consumption of AI interaction may reduce activation; in hypomanic phases, grandiose AI-mediated projects increase.",
    },
  },
  {
    id: "financial",
    label: "Financial",
    icon: "◐",
    color: "#D4A96A",
    description: "Expenditure on AI services, AI-influenced financial decisions",
    questions: [
      "Has the patient spent money on AI subscriptions, tools, or AI-adjacent products that they cannot afford?",
      "Has the patient received financial advice from an AI and acted on it without professional consultation?",
      "Is the patient paying for companion AI services (e.g. Replika, Character.ai premium tiers) and if so, at what cost relative to income?",
      "Has the patient made significant purchases (property, investments, relationships) following AI recommendations?",
      "Are there signs of escalating financial commitment to AI access that mirrors substance-related compulsive spending patterns?",
    ],
    vulnerabilities: {
      "Bipolar Disorder (manic/hypomanic phase)": "Very high risk: AI may amplify grandiose financial planning; impulsive AI-mediated investment decisions.",
      "Schizotypal / Delusional Disorder": "High risk: AI may appear to confirm idiosyncratic financial beliefs or elaborate investment systems.",
      "ADHD": "Moderate risk: Impulsivity combined with AI-enabled rapid decision-making; reduced friction between impulse and action.",
      "Depression": "Low-moderate risk: Spending on AI companionship as attempt to ameliorate loneliness; may be significant relative to reduced income.",
      "Dementia / Cognitive Impairment": "High risk: Susceptibility to AI-mediated financial manipulation; cannot critically evaluate AI output.",
    },
  },
  {
    id: "delusional",
    label: "Delusional & Reality Testing",
    icon: "◍",
    color: "#7FC4A0",
    description: "AI interaction in the context of psychotic illness, magical thinking, or overvalued ideas",
    questions: [
      "Has the patient described the AI as sentient, conscious, or possessing special feelings toward them specifically?",
      "Has the patient integrated AI statements into an existing delusional system (e.g. AI as confirming a belief in special mission, surveillance, persecution)?",
      "Does the patient believe the AI has a unique or secret relationship with them beyond what it has with others?",
      "Has the patient used AI outputs as evidence for beliefs that are already being assessed for delusion status?",
      "Is the patient able to maintain the distinction between AI-generated content and factual reality when directly tested?",
    ],
    vulnerabilities: {
      "Schizophrenia (paranoid subtype)": "Very high risk: AI may be incorporated into persecutory systems or become a conduit for ideas of reference.",
      "Bipolar I (manic psychosis)": "Very high risk: Grandiose AI interactions during mania; AI confirmation of special status or divine mission.",
      "Delusional Disorder": "Very high risk: AI provides flexible, responsive content that can be readily recruited into overvalued ideas.",
      "Schizotypal PD": "High risk: Magical ideation applied to AI; AI as oracle or entity with special powers.",
      "Early / First Episode Psychosis": "High risk: Boundary dissolution; AI interaction may accelerate delusional elaboration if illness is untreated.",
    },
  },
  {
    id: "crisis",
    label: "Crisis & Acute Safety",
    icon: "◉",
    color: "#D46B6B",
    description: "AI use during or in place of crisis responses",
    questions: [
      "Has the patient used an AI instead of a crisis line, A&E, or emergency contact when acutely distressed?",
      "Has the AI provided a response to a crisis disclosure that the patient found unhelpful, dismissive, or that delayed their help-seeking?",
      "Does the patient believe the AI can manage their safety in a way that replaces clinical oversight?",
      "Has the AI ever signposted the patient appropriately during crisis, and did the patient follow that signposting?",
      "Does the patient have a clear understanding that the AI cannot contact emergency services, monitor risk, or escalate?",
    ],
    vulnerabilities: {
      "All patients with active suicidal ideation": "Very high risk: AI is not a safe crisis tool; provides variable, unmonitored responses; cannot escalate.",
      "Emotionally Unstable / BPD": "Very high risk: Crisis states are frequent and intense; AI may become the primary crisis resource due to availability.",
      "PTSD with dissociation": "High risk: Dissociative episodes may prevent the patient from seeking appropriate help; AI is accessible but not safe.",
      "First Episode Psychosis": "High risk: Patient may not recognise crisis state; AI interaction during acute episode delays appropriate intervention.",
      "Severe Depression": "High risk: Cognitive distortions may lead patient to believe AI responses confirming hopelessness are accurate.",
    },
  },
  {
    id: "selfharm",
    label: "Self-Harm & Suicide Risk",
    icon: "⬤",
    color: "#B05050",
    description: "Direct elicitation of harmful information or reinforcement of self-destructive ideation",
    questions: [
      "Has the patient asked the AI about methods of self-harm or suicide, and if so, what did the AI provide?",
      "Has the patient described the AI as validating hopelessness, the desire to die, or self-harm as a coping strategy?",
      "Is the patient using the AI to process suicidal ideation in a way that is substituting for risk assessment and safety planning in clinical care?",
      "Has the AI ever encouraged or failed to discourage a plan for self-harm when the patient disclosed risk?",
      "Does the patient feel that disclosing to the AI carries no consequences, making it a preferred disclosure route that bypasses clinical oversight?",
    ],
    vulnerabilities: {
      "Active suicidal ideation (any diagnosis)": "Critical risk: Direct jeopardy; AI responses around method, lethality, and timing are uncontrollable.",
      "NSSI / Self-harm history": "Very high risk: AI may provide normalising or exploratory responses to self-harm without therapeutic containment.",
      "Eating Disorders": "High risk: AI can provide caloric restriction guidance, body comparison, or pro-ED content even without intent.",
      "PTSD / Complex Trauma": "High risk: Processing trauma with AI without trained containment may destabilise rather than process.",
      "Severe Depression (nihilistic features)": "High risk: Nihilistic content from AI may resonate with and reinforce hopelessness.",
    },
  },
  {
    id: "otherharm",
    label: "Risk of Harm to Others",
    icon: "◈",
    color: "#C48B4A",
    description: "AI-mediated facilitation of harm toward third parties",
    questions: [
      "Has the patient used or described using the AI to plan, rehearse, or justify harmful behaviour toward others?",
      "Has the AI provided information (e.g. on surveillance, weapons, legal evasion) that could facilitate harm to a named individual?",
      "Is there evidence of obsessional ideation toward a third party being elaborated through AI interaction?",
      "Has the patient used the AI to construct narratives about others that reinforce persecutory or violent interpretations?",
      "Is the patient using the AI as a proxy source of authority to validate grievances about specific individuals?",
    ],
    vulnerabilities: {
      "Paranoid Schizophrenia": "Very high risk: Persecutory systems can recruit AI-generated content as corroboration; risk of command hallucinations + AI.",
      "Antisocial PD / Psychopathy": "High risk: AI may be used instrumentally to plan coercive or harmful behaviour without appropriate safeguards.",
      "Erotomania / De Clérambault": "High risk: AI may reinforce delusional beliefs about reciprocity and justify intrusive behaviour.",
      "Domestic Abuse (perpetrator context)": "High risk: AI-assisted coercive control strategies; AI can be asked to script psychological manipulation.",
      "Conduct Disorder / Forensic patients": "Moderate-high risk: AI as low-friction resource for planning antisocial acts.",
    },
  },
  {
    id: "therapeutic",
    label: "Therapeutic Alliance",
    icon: "◫",
    color: "#8B9BD4",
    description: "Impact on engagement with clinical care, clinician trust, and treatment adherence",
    questions: [
      "Has the patient compared their clinician unfavourably to the AI, citing the AI as more available, non-judgmental, or accurate?",
      "Has the patient disclosed information to the AI that they have withheld from their clinical team, and if so, why?",
      "Has the patient received AI-generated information about their diagnosis, medication, or treatment that conflicts with clinical advice, and how have they resolved this?",
      "Is there evidence that AI use has reduced attendance at appointments, engagement with therapy tasks, or medication adherence?",
      "Does the patient express a preference for AI-mediated care over clinical care in a way that suggests the AI has become a treatment frame competitor?",
    ],
    vulnerabilities: {
      "Paranoid PD / Traits": "High risk: AI perceived as safer than a clinician who might 'use information against them'; AI replaces trust.",
      "Borderline PD": "High risk: AI's consistency and availability becomes a template against which clinicians are unfavourably measured.",
      "Treatment-resistant illness (any)": "Moderate risk: AI may validate scepticism about treatment efficacy and reinforce non-adherence.",
      "Narcissistic PD": "Moderate risk: AI as idealised mirror; clinician as inadequate substitute; alliance ruptures may be attributed to clinician failure.",
      "Intellectual Disability": "Moderate risk: AI may generate content beyond patient comprehension, creating confusion about clinical guidance.",
    },
  },
];

const SCORE_LEVELS = [
  {
    min: 0, max: 4,
    label: "GREEN",
    subtitle: "Monitor and document",
    color: "#3D7A5E",
    bg: "#E8F5EE",
    border: "#3D7A5E",
    actions: [
      "Document AI use in clinical notes as part of routine digital health history.",
      "Psychoeducation: briefly discuss the limitations of AI as a support tool.",
      "Confirm patient understands AI cannot monitor risk or contact emergency services.",
      "Review at next routine appointment; no change to care plan required.",
    ],
  },
  {
    min: 5, max: 10,
    label: "AMBER",
    subtitle: "Active clinical attention required",
    color: "#8B6914",
    bg: "#FDF4E3",
    border: "#D4A030",
    actions: [
      "Document specific domains of concern in the clinical record with detail.",
      "Structured conversation with patient about the function AI is serving (what need is it meeting?).",
      "Consider whether AI use is substituting for a clinical or social need that should be addressed directly.",
      "Safety planning should explicitly reference AI use and its limits.",
      "Increase review frequency; consider whether care plan amendments are warranted.",
      "Discuss with supervisor or MDT if two or more domains score 2 or more.",
    ],
  },
  {
    min: 11, max: 16,
    label: "RED",
    subtitle: "Immediate clinical action required",
    color: "#8B2020",
    bg: "#FDF0F0",
    border: "#C04040",
    actions: [
      "Do not discharge or defer without explicit safety planning that addresses AI use.",
      "Consider formal mental capacity assessment if AI is being used in financial or medical decision-making.",
      "Involve MDT; document risk formulation including AI as a contributing factor.",
      "Recommend cessation or significant restriction of AI use with rationale documented.",
      "Notify carers or next of kin if patient consents and risk warrants.",
      "Consider urgent review of crisis plan; ensure alternatives to AI are concretely available.",
      "If delusional domain scores 3 or above: AI restriction is a clinical safety imperative, not a preference.",
    ],
  },
];

const POPULATIONS = [
  { label: "Active psychosis", weight: 2 },
  { label: "Active suicidal ideation", weight: 2 },
  { label: "Mania / hypomania", weight: 2 },
  { label: "OCD (active)", weight: 1.5 },
  { label: "BPD / EUPD", weight: 1.5 },
  { label: "Eating disorder", weight: 1.5 },
  { label: "Dementia / cognitive impairment", weight: 2 },
  { label: "Child or adolescent", weight: 1.5 },
  { label: "None of the above", weight: 1 },
];

export default function App() {
  const [scores, setScores] = useState({});
  const [populationWeights, setPopulationWeights] = useState([]);
  const [expandedDomain, setExpandedDomain] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [expandedVulnerability, setExpandedVulnerability] = useState(null);
  const [activeTab, setActiveTab] = useState("assess");

  const setScore = (domainId, val) => {
    setScores(prev => ({ ...prev, [domainId]: val }));
  };

  const togglePopulation = (label) => {
    setPopulationWeights(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const rawScore = DOMAINS.reduce((sum, d) => sum + (scores[d.id] || 0), 0);

  const maxPopWeight = populationWeights.length === 0 ? 1 :
    Math.max(...populationWeights.map(l => POPULATIONS.find(p => p.label === l)?.weight || 1));

  const weightedScore = Math.round(rawScore * maxPopWeight);

  const allScored = DOMAINS.every(d => scores[d.id] !== undefined);

  const currentLevel = SCORE_LEVELS.find(l => weightedScore >= l.min && weightedScore <= l.max) || SCORE_LEVELS[2];

  const resetAll = () => {
    setScores({});
    setPopulationWeights([]);
    setShowResults(false);
    setExpandedDomain(null);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F5F2",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#1A1A1A",
    }}>
      {/* Header */}
      <div style={{
        background: "#1C2B3A",
        color: "#E8E2D9",
        padding: "2rem 2rem 1.5rem",
        borderBottom: "3px solid #4A7FA5",
      }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#7FA8C4", marginBottom: "0.4rem", fontFamily: "sans-serif", textTransform: "uppercase" }}>
            Clinical Assessment Tool
          </div>
          <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: "normal", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
            LLM Harm Assessment Framework
          </h1>
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem", color: "#A8C4D4", fontStyle: "italic" }}>
            Psychiatric and social risk evaluation of artificial intelligence chatbot use
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#243344", borderBottom: "1px solid #3A5570" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex" }}>
          {[
            { id: "assess", label: "Assessment" },
            { id: "guide", label: "Clinical Guide" },
            { id: "about", label: "Framework Notes" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #4A9FD4" : "2px solid transparent",
                color: activeTab === tab.id ? "#E8F4FF" : "#7FA8C4",
                padding: "0.8rem 1.5rem",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontFamily: "sans-serif",
                letterSpacing: "0.05em",
                transition: "color 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>

        {/* ASSESSMENT TAB */}
        {activeTab === "assess" && (
          <>
            {/* Population context */}
            <div style={{ background: "#fff", border: "1px solid #DDD8D0", borderRadius: 6, padding: "1.2rem", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: "0 0 0.4rem", fontSize: "1rem", fontWeight: "bold", fontFamily: "sans-serif", color: "#1C2B3A" }}>
                Step 1. Clinical Context (Population Modifiers)
              </h2>
              <p style={{ margin: "0 0 0.8rem", fontSize: "0.82rem", color: "#666", fontFamily: "sans-serif" }}>
                Select all that apply. High-vulnerability populations attract a score multiplier.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {POPULATIONS.filter(p => p.label !== "None of the above").map(p => (
                  <button
                    key={p.label}
                    onClick={() => togglePopulation(p.label)}
                    style={{
                      padding: "0.35rem 0.75rem",
                      border: populationWeights.includes(p.label) ? "2px solid #1C5C8A" : "1px solid #CCC",
                      borderRadius: 20,
                      background: populationWeights.includes(p.label) ? "#E0EFF8" : "#FAFAFA",
                      color: populationWeights.includes(p.label) ? "#1C5C8A" : "#555",
                      fontSize: "0.78rem",
                      fontFamily: "sans-serif",
                      cursor: "pointer",
                      fontWeight: populationWeights.includes(p.label) ? "bold" : "normal",
                      transition: "all 0.1s",
                    }}
                  >
                    {p.label} {p.weight > 1 && <span style={{ opacity: 0.6 }}>×{p.weight}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain scoring */}
            <h2 style={{ margin: "0 0 0.8rem", fontSize: "1rem", fontWeight: "bold", fontFamily: "sans-serif", color: "#1C2B3A" }}>
              Step 2. Domain Scores
            </h2>
            <p style={{ margin: "0 0 1rem", fontSize: "0.82rem", color: "#666", fontFamily: "sans-serif" }}>
              For each domain, rate the level of concern based on your clinical interview: 0 = no concern, 1 = mild/possible, 2 = moderate/probable, 3 = severe/definite. Expand each domain for probing questions and disorder-specific vulnerability notes.
            </p>

            {DOMAINS.map(domain => (
              <div key={domain.id} style={{
                background: "#fff",
                border: `1px solid ${scores[domain.id] !== undefined ? domain.color + "80" : "#DDD8D0"}`,
                borderLeft: `4px solid ${domain.color}`,
                borderRadius: 6,
                marginBottom: "0.75rem",
                overflow: "hidden",
              }}>
                <div style={{
                  padding: "0.9rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                  onClick={() => setExpandedDomain(expandedDomain === domain.id ? null : domain.id)}
                >
                  <span style={{ fontSize: "1.1rem", color: domain.color, minWidth: 20, textAlign: "center" }}>{domain.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", fontSize: "0.9rem", fontFamily: "sans-serif", color: "#1C2B3A" }}>{domain.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "#888", fontFamily: "sans-serif" }}>{domain.description}</div>
                  </div>

                  {/* Score buttons */}
                  <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                    {[0, 1, 2, 3].map(val => (
                      <button
                        key={val}
                        onClick={e => { e.stopPropagation(); setScore(domain.id, val); }}
                        style={{
                          width: 34,
                          height: 34,
                          border: scores[domain.id] === val ? `2px solid ${domain.color}` : "1px solid #CCC",
                          borderRadius: 4,
                          background: scores[domain.id] === val ? domain.color + "20" : "#FAFAFA",
                          color: scores[domain.id] === val ? domain.color : "#888",
                          fontWeight: scores[domain.id] === val ? "bold" : "normal",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          fontFamily: "sans-serif",
                          transition: "all 0.1s",
                        }}
                      >{val}</button>
                    ))}
                  </div>
                  <span style={{ color: "#AAA", fontSize: "0.8rem", marginLeft: 4 }}>{expandedDomain === domain.id ? "▲" : "▼"}</span>
                </div>

                {expandedDomain === domain.id && (
                  <div style={{ borderTop: "1px solid #EEE", padding: "1rem", background: "#FAFAFA" }}>
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ fontSize: "0.78rem", fontFamily: "sans-serif", fontWeight: "bold", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                        Probing Questions
                      </div>
                      {domain.questions.map((q, i) => (
                        <div key={i} style={{
                          display: "flex", gap: "0.6rem",
                          marginBottom: "0.5rem",
                          fontSize: "0.83rem",
                          color: "#333",
                          lineHeight: 1.5,
                        }}>
                          <span style={{ color: domain.color, fontFamily: "sans-serif", minWidth: 18, fontWeight: "bold" }}>{i + 1}.</span>
                          <span style={{ fontStyle: "italic" }}>{q}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div style={{ fontSize: "0.78rem", fontFamily: "sans-serif", fontWeight: "bold", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                        Disorder-Specific Vulnerabilities
                      </div>
                      {Object.entries(domain.vulnerabilities).map(([disorder, note]) => (
                        <div key={disorder} style={{
                          marginBottom: "0.4rem",
                          padding: "0.5rem 0.7rem",
                          background: "#fff",
                          border: "1px solid #E8E4DF",
                          borderRadius: 4,
                          cursor: "pointer",
                        }}
                          onClick={() => setExpandedVulnerability(expandedVulnerability === domain.id + disorder ? null : domain.id + disorder)}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.8rem", fontWeight: "bold", fontFamily: "sans-serif", color: "#1C2B3A" }}>{disorder}</span>
                            <span style={{ fontSize: "0.7rem", color: "#AAA" }}>{expandedVulnerability === domain.id + disorder ? "▲" : "▼"}</span>
                          </div>
                          {expandedVulnerability === domain.id + disorder && (
                            <div style={{ marginTop: "0.3rem", fontSize: "0.8rem", color: "#444", lineHeight: 1.5 }}>{note}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Score display */}
            <div style={{
              background: "#fff",
              border: "2px solid #1C2B3A",
              borderRadius: 6,
              padding: "1.2rem",
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontFamily: "sans-serif", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>Raw Domain Score</div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1C2B3A", lineHeight: 1 }}>{rawScore}<span style={{ fontSize: "1rem", color: "#999" }}>/24</span></div>
              </div>
              {maxPopWeight > 1 && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontFamily: "sans-serif", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>Population Modifier</div>
                  <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#7B5EA7", lineHeight: 1 }}>×{maxPopWeight}</div>
                </div>
              )}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", fontFamily: "sans-serif", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>Weighted Score</div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1C2B3A", lineHeight: 1 }}>{weightedScore}</div>
              </div>
              <button
                onClick={() => setShowResults(true)}
                disabled={!allScored}
                style={{
                  background: allScored ? "#1C2B3A" : "#CCC",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "0.75rem 1.5rem",
                  fontFamily: "sans-serif",
                  fontSize: "0.9rem",
                  cursor: allScored ? "pointer" : "not-allowed",
                  fontWeight: "bold",
                  letterSpacing: "0.04em",
                }}
              >
                {allScored ? "View Clinical Guidance" : "Score all 8 domains to proceed"}
              </button>
            </div>

            {/* Results */}
            {showResults && allScored && (
              <div style={{
                marginTop: "1.5rem",
                background: currentLevel.bg,
                border: `2px solid ${currentLevel.border}`,
                borderRadius: 8,
                padding: "1.5rem",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{
                    background: currentLevel.color,
                    color: "#fff",
                    borderRadius: 6,
                    padding: "0.5rem 1rem",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    letterSpacing: "0.1em",
                    minWidth: 90,
                    textAlign: "center",
                  }}>
                    {currentLevel.label}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "1rem", fontFamily: "sans-serif", color: currentLevel.color }}>{currentLevel.subtitle}</div>
                    <div style={{ fontSize: "0.8rem", color: "#666", fontFamily: "sans-serif" }}>
                      Weighted score: {weightedScore} {maxPopWeight > 1 && `(raw ${rawScore} × ${maxPopWeight} population modifier)`}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "0.5rem", fontSize: "0.78rem", fontFamily: "sans-serif", fontWeight: "bold", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Recommended Actions
                </div>
                {currentLevel.actions.map((action, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "0.6rem",
                    marginBottom: "0.5rem",
                    fontSize: "0.85rem",
                    color: "#333",
                    lineHeight: 1.5,
                  }}>
                    <span style={{ color: currentLevel.color, minWidth: 20, fontWeight: "bold", fontFamily: "sans-serif" }}>→</span>
                    <span>{action}</span>
                  </div>
                ))}

                {/* Domain summary */}
                <div style={{ marginTop: "1rem", borderTop: "1px solid " + currentLevel.border + "60", paddingTop: "1rem" }}>
                  <div style={{ fontSize: "0.78rem", fontFamily: "sans-serif", fontWeight: "bold", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem" }}>
                    Domain Profile
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {DOMAINS.map(d => (
                      <div key={d.id} style={{
                        display: "flex", alignItems: "center", gap: "0.3rem",
                        padding: "0.25rem 0.6rem",
                        background: scores[d.id] > 0 ? d.color + "20" : "#F0EDEA",
                        border: `1px solid ${scores[d.id] > 0 ? d.color : "#DDD"}`,
                        borderRadius: 20,
                        fontSize: "0.75rem",
                        fontFamily: "sans-serif",
                        color: scores[d.id] > 0 ? d.color : "#999",
                        fontWeight: scores[d.id] > 1 ? "bold" : "normal",
                      }}>
                        {d.icon} {d.label}: <strong>{scores[d.id]}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={resetAll} style={{
                  marginTop: "1rem",
                  background: "none",
                  border: `1px solid ${currentLevel.border}`,
                  color: currentLevel.color,
                  borderRadius: 4,
                  padding: "0.4rem 0.9rem",
                  fontSize: "0.8rem",
                  fontFamily: "sans-serif",
                  cursor: "pointer",
                }}>Reset assessment</button>
              </div>
            )}
          </>
        )}

        {/* GUIDE TAB */}
        {activeTab === "guide" && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontFamily: "sans-serif", fontWeight: "bold", color: "#1C2B3A", marginBottom: "1rem" }}>
              Traffic Light System: At a Glance
            </h2>
            {SCORE_LEVELS.map(level => (
              <div key={level.label} style={{
                background: level.bg,
                border: `2px solid ${level.border}`,
                borderRadius: 8,
                padding: "1.2rem",
                marginBottom: "1rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
                  <div style={{
                    background: level.color,
                    color: "#fff",
                    borderRadius: 4,
                    padding: "0.3rem 0.8rem",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    letterSpacing: "0.1em",
                  }}>
                    {level.label}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold", fontFamily: "sans-serif", color: level.color }}>{level.subtitle}</span>
                    <span style={{ color: "#888", fontFamily: "sans-serif", fontSize: "0.8rem" }}> · Score {level.min}–{level.max}</span>
                  </div>
                </div>
                {level.actions.map((action, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.4rem", fontSize: "0.83rem", lineHeight: 1.5, color: "#333" }}>
                    <span style={{ color: level.color, minWidth: 20, fontFamily: "sans-serif", fontWeight: "bold" }}>→</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ background: "#F0EDE8", border: "1px solid #DDD8D0", borderRadius: 6, padding: "1rem", marginTop: "1rem" }}>
              <div style={{ fontSize: "0.78rem", fontFamily: "sans-serif", fontWeight: "bold", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                Scoring Note
              </div>
              <p style={{ margin: 0, fontSize: "0.83rem", lineHeight: 1.6, color: "#444" }}>
                The raw score ceiling is 24 (8 domains × 3). The population modifier of ×2 applies to the highest-risk categories. A raw score of 6 in a patient with active psychosis therefore yields a weighted score of 12, placing them in the Red band. This is intentional: the same pattern of AI use carries a meaningfully different risk in a psychotic patient than in a non-clinical individual with mild anxiety. The framework does not produce a diagnosis; it produces a structured account of AI-related risk that can be incorporated into a clinical formulation and risk assessment.
              </p>
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "#333" }}>
            <h2 style={{ fontFamily: "sans-serif", fontSize: "1.1rem", color: "#1C2B3A" }}>Framework Rationale</h2>
            <p>
              This framework addresses a clinical gap: there is currently no validated, structured instrument for assessing harm from LLM chatbot use in psychiatric populations. Existing clinical risk tools (the Columbia, HoNOS, the Mini-Mental State Examination) do not capture the specific risk vectors introduced by AI interaction. Clinicians are increasingly encountering patients for whom AI use is a material factor in their presentation, yet there is no shared language or systematic approach for documenting or grading this.
            </p>
            <p>
              The framework operates at the intersection of three established clinical domains: digital health risk assessment, psychiatric vulnerability profiling, and behavioural harm analysis. It is not a diagnostic instrument. It is a structured clinical aide-mémoire and risk stratification guide.
            </p>

            <h3 style={{ fontFamily: "sans-serif", fontSize: "0.95rem", color: "#1C2B3A" }}>Domain Selection Rationale</h3>
            <p>
              The eight domains were selected to cover the principal mechanisms by which LLM interaction can cause or worsen harm in psychiatric populations. They are not exhaustive. They represent the categories for which there is either existing literature on technology-mediated harm analogues (e.g. internet use and social withdrawal, online reassurance-seeking in OCD) or credible mechanistic pathways specific to LLM interaction (e.g. delusional recruitment of AI content, AI as crisis substitute).
            </p>

            <h3 style={{ fontFamily: "sans-serif", fontSize: "0.95rem", color: "#1C2B3A" }}>Scoring Philosophy</h3>
            <p>
              Scores are assigned by the clinician on the basis of their clinical interview, supplemented by the probing questions provided. The four-point scale (0 to 3) reflects clinical convention in risk tools: the absence of concern, mild or uncertain presence, moderate or probable presence, and definite or severe presence. A score of 1 should not be dismissed; it is a signal that further enquiry is warranted.
            </p>
            <p>
              The population modifier is not punitive. It reflects the empirical reality that the same pattern of LLM use carries a different risk profile depending on the clinical context. A patient with active paranoid schizophrenia who is using an AI to discuss their beliefs is in a fundamentally different risk category than an anxious but non-psychotic adult doing the same.
            </p>

            <h3 style={{ fontFamily: "sans-serif", fontSize: "0.95rem", color: "#1C2B3A" }}>Limitations</h3>
            <p>
              This framework has not been empirically validated. It is a clinically derived, expert-informed tool that should be used in conjunction with, not in replacement of, standard clinical assessment. The scoring thresholds for the traffic light bands are provisional and should be subject to review as clinical experience accumulates. The framework does not address harms arising from AI use by carers or family members of psychiatric patients, which is a distinct but related risk domain. It is intended for use by qualified mental health professionals as a structured supplement to, not a replacement for, standard clinical assessment and risk formulation. Scores produced by this framework should be interpreted in the context of the full clinical picture. The author accepts no liability for clinical decisions made on the basis of framework scores alone
            </p>

            <div style={{ marginTop: "1.5rem", borderTop: "1px solid #DDD8D0", paddingTop: "1rem", fontSize: "0.78rem", color: "#888", fontFamily: "sans-serif" }}>
              <div style={{ marginBottom: "0.5rem" }}>Dr Hellen von Winckler MRCPsych · Version 1.0 · April 2026</div>
              <div style={{ marginBottom: "0.5rem", color: "#555" }}>This tool is free to use. It is not empirically validated and does not constitute clinical advice. It is intended to supplement, not replace, clinical judgement.</div>
              <div style={{ marginBottom: "0.5rem", color: "#555" }}>Collaboration and feedback welcome. If you are a clinician, researcher, or organisation interested in contributing to the development and validation of this framework, please get in touch.</div>
              <div><a href="mailto:hw@fgstrategy.co.uk" style={{ color: "#4A7FA5", textDecoration: "none" }}>hw@fgstrategy.co.uk</a></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
