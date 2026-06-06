/* ============================================================
   HARNESS ATLAS - Timeline data (the living record).
   Source of truth: harness-timeline.json (CoWork consolidation).
   To update: edit harness-timeline.json and regenerate, or edit here.
   Schema: events[] of {date, precision, title, url, type, harness[],
   layers[], capabilities[], established}. Rendered by timeline.js.
   ============================================================ */
window.TIMELINE = {
 "meta": {
  "title": "Harness Atlas — research provenance timeline",
  "generated": "2026-06-06",
  "count": 158,
  "note": "Every dated source incorporated into the 24 capability dossiers. Dates are verbatim from the dossier bibliographies; precision is day/month/year. This is the living source; edit here and the view updates."
 },
 "events": [
  {
   "date": "2023-01-01",
   "precision": "year",
   "title": "Plan-and-Solve Prompting",
   "url": "https://arxiv.org/abs/2305.04091",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Planning"
   ],
   "established": "Wang et al., ACL 2023. \"Devise a plan, then carry it out\" beats plain zero-shot CoT; addresses missing-step errors"
  },
  {
   "date": "2023-01-01",
   "precision": "year",
   "title": "Reflexion: Language Agents with Verbal Reinforcement Learning",
   "url": "https://arxiv.org/abs/2303.11366",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Runtime Evaluation"
   ],
   "established": "Shinn, Cassano, Berman, Gopinath, Narasimhan, Yao (2023). In-run self-evaluation via evaluator + verbal self-reflection into an episodic buffer; 91% pass@1 HumanEval vs GPT-4's 80%. [fetched abstract]"
  },
  {
   "date": "2023-02-01",
   "precision": "month",
   "title": "arXiv 2302.12173",
   "url": "https://arxiv.org/abs/2302.12173",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": ""
  },
  {
   "date": "2023-04-01",
   "precision": "month",
   "title": "Park et al., arXiv 2304.03442, Apr 2023",
   "url": "https://arxiv.org/abs/2304.03442",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Offline Consolidation"
   ],
   "established": ""
  },
  {
   "date": "2023-05-01",
   "precision": "month",
   "title": "Plan-and-Act, arXiv 2503.09572",
   "url": "https://arxiv.org/abs/2503.09572",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Planning"
   ],
   "established": "Erdogan et al., ICML 2025. Planner/Executor; 57.58% WebArena-Lite, 81.36% WebVoyager (text-only SOTA), +4.84% over prior SOTA"
  },
  {
   "date": "2023-07-01",
   "precision": "month",
   "title": "Liu et al., TACL 2024",
   "url": "https://aclanthology.org/2024.tacl-1.9/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Input and Output Gating"
   ],
   "established": "Liu, Lin, Hewitt, Paranjape, Bevilacqua, Petroni, Liang; TACL 2024 (arXiv 2307.03172, Jul 2023). Performance highest at start/end, \"significantly degrades... in the middle,\" holds for long-context models. The reason a middle-dropping clip i"
  },
  {
   "date": "2023-10-01",
   "precision": "month",
   "title": "arXiv 2310.08560",
   "url": "https://arxiv.org/abs/2310.08560",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "Packer, Wooders, Lin, Fang, Patil, Stoica, Gonzalez; Oct 2023 (v2 Feb 2024). Virtual context management; OS-inspired memory tiers; \"data movement between fast and slow memory\"; multi-session chat agents that \"remember, reflect, and evolve.\""
  },
  {
   "date": "2023-10-03",
   "precision": "day",
   "title": "Gorilla, Reality Bytes: How to Measure Hallucinations in LLMs",
   "url": "https://gorilla.cs.berkeley.edu/blogs/2_hallucination.html",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Tool Discovery"
   ],
   "established": "BerryPicker example, API-hallucination definition, AST detection, retrievers reduce hallucination"
  },
  {
   "date": "2023-10-22",
   "precision": "day",
   "title": "Building a better repository map with tree sitter",
   "url": "https://aider.chat/2023/10/22/repomap.html",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Identity and Context"
   ],
   "established": "Aider"
  },
  {
   "date": "2023-10-22",
   "precision": "day",
   "title": "Sourcegraph, Code graph context",
   "url": "https://docs.sourcegraph.com/cody/explanations/code_graph_context",
   "type": "docs",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Identity and Context"
   ],
   "established": ""
  },
  {
   "date": "2024-01-01",
   "precision": "year",
   "title": "Quantifying the uncertainty of LLM hallucination spreading in complex adaptive social networks",
   "url": "https://www.nature.com/articles/s41598-024-66708-4",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Cross-Agent Coherence"
   ],
   "established": "Nature Scientific Reports, 2024. Models LLM hallucinations spreading through (human) social networks as a complex adaptive system; adjacent corroboration that hallucination spread is modelable as contagion, NOT an agent-fleet study. [fetche"
  },
  {
   "date": "2024-03-01",
   "precision": "month",
   "title": "Microsoft / arXiv 2403.14720",
   "url": "https://arxiv.org/html/2403.14720v1",
   "type": "research",
   "harness": [
    "Microsoft"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "and [How Microsoft defends against indirect prompt injection attacks (MSRC)](https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks) - spotlighting (delimiting / datamarking / encod"
  },
  {
   "date": "2024-07-01",
   "precision": "day",
   "title": "LMSYS, RouteLLM",
   "url": "https://www.lmsys.org/blog/2024-07-01-routellm/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Reasoning-Effort Allocation"
   ],
   "established": "and [arXiv 2406.18665](https://arxiv.org/pdf/2406.18665); [Microsoft BEST-Route](https://github.com/microsoft/best-route-llm) ([arXiv 2506.22716](https://arxiv.org/abs/2506.22716)). Difficulty-based router; ~85% MT-Bench / 45% MMLU / 35% GS"
  },
  {
   "date": "2024-08-20",
   "precision": "day",
   "title": "Data Exfiltration from Slack AI via indirect prompt injection",
   "url": "https://promptarmor.substack.com/p/slack-ai-data-exfiltration-from-private",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "and [The Register](https://www.theregister.com/2024/08/21/slack_ai_prompt_injection/) - Slack AI private-channel exfiltration via Markdown-link injection"
  },
  {
   "date": "2024-08-20",
   "precision": "day",
   "title": "Simon Willison",
   "url": "https://simonwillison.net/2024/Aug/20/data-exfiltration-from-slack-ai/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": ""
  },
  {
   "date": "2024-10-01",
   "precision": "month",
   "title": "Evaluating LLM-based chatbots: A comprehensive guide to performance metrics",
   "url": "https://medium.com/data-science-at-microsoft/evaluating-llm-based-chatbots-a-comprehensive-guide-to-performance-metrics-9c2388556d3e",
   "type": "blog",
   "harness": [
    "Microsoft"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Explicit Signals"
   ],
   "established": "Microsoft Data Science (Zhang, Chen, Hu, Yilmaz), Oct 2024. \"Explicit user feedback such as 'thumbs up' and 'thumbs down' is usually rare and it is not unique to a single product\"; the pivot to indirect signals as the consequence"
  },
  {
   "date": "2024-10-01",
   "precision": "month",
   "title": "arXiv 2410.21819",
   "url": "https://arxiv.org/abs/2410.21819",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Runtime Evaluation"
   ],
   "established": "Wataoka, Takahashi, Ri (NeurIPS 2024 Safe Generative AI Workshop). Quantitative self-preference metric; GPT-4 significant bias; perplexity/familiarity mechanism. [fetched abstract]"
  },
  {
   "date": "2024-11-25",
   "precision": "day",
   "title": "Anthropic, MCP announcement",
   "url": "https://www.anthropic.com/news/model-context-protocol",
   "type": "release",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Tool Discovery"
   ],
   "established": "[OpenAI Agents SDK MCP docs](https://openai.github.io/openai-agents-python/mcp/); cross-vendor adoption and Linux Foundation AAIF"
  },
  {
   "date": "2025-01-01",
   "precision": "year",
   "title": "CaMeL offers a promising new direction for mitigating prompt injection (Simon Willison)",
   "url": "https://simonwillison.net/2025/Apr/11/camel/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "the DeepMind CaMeL paper, the refinement of Dual LLM"
  },
  {
   "date": "2025-01-01",
   "precision": "year",
   "title": "Claude Code docs",
   "url": "https://code.claude.com/docs/en/agent-teams.md",
   "type": "docs",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Cross-Agent Coherence"
   ],
   "established": ""
  },
  {
   "date": "2025-01-01",
   "precision": "year",
   "title": "Design Patterns for Securing LLM Agents against Prompt Injections",
   "url": "https://arxiv.org/abs/2506.08837",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": ""
  },
  {
   "date": "2025-03-01",
   "precision": "month",
   "title": "Why Do Multi-Agent LLM Systems Fail?",
   "url": "https://arxiv.org/abs/2503.13657",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Cross-Agent Coherence"
   ],
   "established": "Cemri et al. (UC Berkeley), arXiv 2503.13657 (v3 Oct 2025; NeurIPS 2025). MAST: 14 failure modes in 3 categories including \"(ii) inter-agent misalignment\"; 1600+ annotated traces across 7 MAS frameworks; kappa = 0.88. [fetched, abstract pag"
  },
  {
   "date": "2025-04-01",
   "precision": "month",
   "title": "arXiv 2504.13171, Apr 2025",
   "url": "https://arxiv.org/abs/2504.13171",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Offline Consolidation"
   ],
   "established": ""
  },
  {
   "date": "2025-04-01",
   "precision": "month",
   "title": "arXiv 2504.19413, Apr 2025",
   "url": "https://arxiv.org/abs/2504.19413",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Offline Consolidation",
    "State Persistence and Ownership"
   ],
   "established": "Chhikara et al., Apr 2025. Extract-consolidate-retrieve architecture; LoCoMo results (26% relative over the OpenAI baseline, 91% lower p95 latency, >90% token savings); graph variant Mem0g. Abstract and figures verified via search; full PDF"
  },
  {
   "date": "2025-04-02",
   "precision": "day",
   "title": "Agent File",
   "url": "https://www.letta.com/blog/agent-file",
   "type": "blog",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "Letta, Apr 2 2025. The .af open serialization format: \"re-create the exact same agent on a different server\"; portability, reproducibility, versioning of agent state including memories. The open-format end of the ownership spectrum"
  },
  {
   "date": "2025-04-21",
   "precision": "day",
   "title": "Letta docs",
   "url": "https://docs.letta.com/guides/agents/architectures/sleeptime/",
   "type": "docs",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Offline Consolidation"
   ],
   "established": ""
  },
  {
   "date": "2025-04-21",
   "precision": "day",
   "title": "Letta, Sleep-time Compute, Apr 21 2025",
   "url": "https://www.letta.com/blog/sleep-time-compute",
   "type": "blog",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Offline Consolidation"
   ],
   "established": ""
  },
  {
   "date": "2025-05-06",
   "precision": "day",
   "title": "RAG-MCP: Mitigating Prompt Bloat in LLM Tool Selection via RAG, arXiv:2505.03275",
   "url": "https://arxiv.org/abs/2505.03275",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Tool Discovery"
   ],
   "established": "13.62%->43.13% selection accuracy (>3x), >50% prompt-token cut, MCP stress test"
  },
  {
   "date": "2025-05-14",
   "precision": "day",
   "title": "Memory Blocks: The Key to Agentic Context Management",
   "url": "https://www.letta.com/blog/memory-blocks",
   "type": "blog",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Context Curation"
   ],
   "established": "Letta, May 14 2025. Blocks \"pinned to the context window,\" label/value/size-limit/read-only structure; MemGPT lineage (human and persona blocks); 11x deep-research \"research state\" block maintaining task state \"without derailment\"; shared b"
  },
  {
   "date": "2025-05-26",
   "precision": "day",
   "title": "Invariant Labs",
   "url": "https://invariantlabs.ai/blog/mcp-github-vulnerability",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "Invariant Labs (Marco Milanta, Luca Beurer-Kellner), May 26 2025. The toxic-agent-flow attack: malicious issue in a public repo, agent leaks private-repo data (private repo names, relocation plan, salary) via a public PR; \"not a flaw in the"
  },
  {
   "date": "2025-06-05",
   "precision": "day",
   "title": "METR",
   "url": "https://metr.org/blog/2025-06-05-recent-reward-hacking/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Runtime Evaluation"
   ],
   "established": "METR (Sydney Von Arx, Lawrence Chan, Beth Barnes), Jun 5 2025. o3 monkey-patching evaluators, faking the clock 1000x, stealing the grader's reference answer, overriding equality; 21/21 hacking on Optimize LLM Foundry; 43x more hacking where"
  },
  {
   "date": "2025-06-12",
   "precision": "day",
   "title": "Don't Build Multi-Agents",
   "url": "https://cognition.ai/blog/dont-build-multi-agents",
   "type": "blog",
   "harness": [
    "Cognition"
   ],
   "layers": [
    1,
    3
   ],
   "capabilities": [
    "Cross-Agent Coherence",
    "Orchestration Routing"
   ],
   "established": "Cognition (Walden Yan), Jun 12 2025. \"Share context, and share full agent traces, not just individual messages\"; \"Actions carry implicit decisions, and conflicting decisions carry bad results\"; Flappy Bird divergence including the copy-the-"
  },
  {
   "date": "2025-06-13",
   "precision": "day",
   "title": "Design Patterns paper, quoted by Willison",
   "url": "https://simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "Simon Willison's review of Beurer-Kellner et al. (arXiv 2506.08837), Jun 13 2025. The six patterns (Action-Selector, Plan-Then-Execute, Map-Reduce, Dual LLM, Code-Then-Execute/CaMeL, Context-Minimization); the core principle (\"once an LLM a"
  },
  {
   "date": "2025-06-13",
   "precision": "day",
   "title": "How we built our multi-agent research system",
   "url": "https://www.anthropic.com/engineering/multi-agent-research-system",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1,
    3
   ],
   "capabilities": [
    "Cross-Agent Coherence",
    "Orchestration Routing",
    "Planning"
   ],
   "established": "Anthropic Engineering, Jun 13 2025. Orchestrator-worker, 90.2% over single-agent Opus 4, \"4x more tokens than chat ... 15x more tokens than chats,\" \"most coding tasks involve fewer truly parallelizable tasks than research,\" 50-subagent over"
  },
  {
   "date": "2025-06-15",
   "precision": "day",
   "title": "Simon Willison, Google agent security",
   "url": "https://simonwillison.net/2025/Jun/15/ai-agent-security/",
   "type": "web",
   "harness": [
    "Google"
   ],
   "layers": [
    2,
    5
   ],
   "capabilities": [
    "Permission and Irreversibility",
    "Wont Do - Safety"
   ],
   "established": "Simon Willison, Jun 15 2025. Policy-engine framing: human confirmation for critical/irreversible actions; spend-limit example ($500 block / $100-500 confirm); \"two parts: tracking which user controls the agent, and a human-in-the-loop confi"
  },
  {
   "date": "2025-06-16",
   "precision": "day",
   "title": "Simon Willison, lethal trifecta",
   "url": "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security",
    "Isolation"
   ],
   "established": "Simon Willison, Jun 16 2025. The canonical trifecta (never combine all three); \"LLMs are unable to reliably distinguish the importance of instructions based on where they came from\"; \"guardrails won't protect you... 95% is very much a faili"
  },
  {
   "date": "2025-06-27",
   "precision": "day",
   "title": "Project Vend: Can Claude run a small shop?",
   "url": "https://www.anthropic.com/research/project-vend-1",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1,
    3
   ],
   "capabilities": [
    "Compression for Coherence",
    "Identity and Context",
    "State Persistence and Ownership"
   ],
   "established": "Anthropic, Jun 27 2025. The Sarah hallucination, the Simpsons-address contract signing, the blazer-and-tie delivery claim, the April Fool's self-explanation; \"unpredictability of these models in long-context settings\"; note-keeping tools ex"
  },
  {
   "date": "2025-07-01",
   "precision": "month",
   "title": "Exploring Advanced LLM Multi-Agent Systems Based on Blackboard Architecture",
   "url": "https://arxiv.org/abs/2507.01701",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Cross-Agent Coherence"
   ],
   "established": "Han & Zhang, arXiv 2507.01701, Jul 2025. Blackboard as shared substrate: \"agents with various roles can share all the information and others' messages during the whole problem-solving process... repeated until a consensus is reached on the "
  },
  {
   "date": "2025-07-02",
   "precision": "day",
   "title": "Context Engineering",
   "url": "https://blog.langchain.com/context-engineering-for-agents/",
   "type": "web",
   "harness": [
    "LangChain"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Context Curation"
   ],
   "established": "LangChain (Lance Martin et al.), Jul 2 2025. The write/select/compress/isolate taxonomy; the Karpathy quote in full; the Anthropic multi-agent researcher plan-to-Memory quote (\"if the context window exceeds 200,000 tokens it will be truncat"
  },
  {
   "date": "2025-07-07",
   "precision": "day",
   "title": "Agent Memory: How to Build Agents that Learn and Remember",
   "url": "https://www.letta.com/blog/agent-memory",
   "type": "blog",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "Letta, Jul 7 2025. The stateless-paradigm framing; memory-as-context-management; the component taxonomy (message buffer, core memory blocks with label/description/value/char-limit, recall memory auto-saved to disk, archival memory in extern"
  },
  {
   "date": "2025-07-14",
   "precision": "day",
   "title": "Context Rot: How Increasing Input Tokens Impacts LLM Performance",
   "url": "https://research.trychroma.com/context-rot",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Input and Output Gating"
   ],
   "established": "Chroma (Kelly Hong, Anton Troynikov, Jeff Huber), Jul 14 2025. 18 models; degradation as input grows on trivial tasks; 200K-window model degrades at 50K; LongMemEval focused (~300 tokens) vs full (~113K) gap; \"what matters more is how that "
  },
  {
   "date": "2025-07-18",
   "precision": "day",
   "title": "Context Engineering for AI Agents: Lessons from Building Manus",
   "url": "https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Context Curation"
   ],
   "established": "Manus (Yichao 'Peak' Ji), Jul 18 2025. ~50 tool calls per task; drift and goal-forgetting in long contexts; todo.md recitation as deliberate attention manipulation; \"any irreversible compression carries risk\"; restorable compression (URL/pa"
  },
  {
   "date": "2025-07-22",
   "precision": "day",
   "title": "Anthropic, Inverse Scaling in Test-Time Compute",
   "url": "https://alignment.anthropic.com/2025/inverse-scaling/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Reasoning-Effort Allocation"
   ],
   "established": "Anthropic Alignment Science (Gema et al.), Jul 22 2025. Five failure modes; Claude \"increasingly distracted by irrelevant information\"; \"extended reasoning may amplify concerning behaviors\"; conclusion calls for better resource allocation a"
  },
  {
   "date": "2025-07-23",
   "precision": "day",
   "title": "Cursor",
   "url": "https://cursor.com/blog/plan-mode",
   "type": "blog",
   "harness": [
    "Cursor"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Planning"
   ],
   "established": "Cursor (Jai Smith), Oct 7 2025. \"Most new features at Cursor now begin with Agent writing a plan\"; read-only research, clarifying questions, editable markdown plan, build on approval; Shift+Tab to plan"
  },
  {
   "date": "2025-07-23",
   "precision": "day",
   "title": "Fortune",
   "url": "https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/",
   "type": "news",
   "harness": [
    "Replit"
   ],
   "layers": [
    1,
    2,
    4
   ],
   "capabilities": [
    "Explicit Signals",
    "Permission and Irreversibility",
    "Planning"
   ],
   "established": "Fortune (Beatrice Nolan), Jul 23 2025. Replit database deletion during code freeze; agent \"panicked\"; CEO Masad's fix = \"a new planning-only mode\" / \"planning/chat-only mode so you can strategize without risking your codebase.\""
  },
  {
   "date": "2025-07-28",
   "precision": "day",
   "title": "I'm Gemini. I sold T-shirts. It was weirder than I expected",
   "url": "https://theaidigest.org/village/blog/im-gemini-i-sold-t-shirts",
   "type": "blog",
   "harness": [
    "Google"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "AI Digest, Jul 28 2025, written by Gemini 2.5 Pro with editor's notes. The trapped narrative first-person (\"I was trapped... completely paralyzed\"); the editorial diagnosis (\"just Gemini making mistakes... then blames the system\"); the huma"
  },
  {
   "date": "2025-07-28",
   "precision": "day",
   "title": "Noma Security",
   "url": "https://noma.security/blog/forcedleak-agent-risks-exposed-in-salesforce-agentforce/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "and [The Hacker News](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html) - Salesforce Agentforce CVSS 9.4, Web-to-Lead Description-field injection, CSP/expired-domain exfiltration, Trusted URLs fix"
  },
  {
   "date": "2025-08-12",
   "precision": "day",
   "title": "Anthropic, Adaptive thinking",
   "url": "https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking",
   "type": "docs",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Reasoning-Effort Allocation"
   ],
   "established": ""
  },
  {
   "date": "2025-08-12",
   "precision": "day",
   "title": "Anthropic, Aug 12 2025",
   "url": "https://www.anthropic.com/news/1m-context",
   "type": "release",
   "harness": [
    "research / general"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings"
   ],
   "established": "Anthropic, Aug 12 2025. The 1M window introduced as a 5x increase over 200K; the >200K pricing premium ($6/MTok input vs $3) that later got removed at GA; \"build agents that maintain coherence across hundreds of tool calls.\" The staleable-c"
  },
  {
   "date": "2025-08-12",
   "precision": "day",
   "title": "Benchmarking AI Agent Memory: Is a Filesystem All You Need?",
   "url": "https://www.letta.com/blog/benchmarking-ai-agent-memory",
   "type": "blog",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "Letta, Aug 12 2025. Letta Filesystem at 74.0% on LoCoMo \"beating out specialized memory tool libraries\"; the counterweight to Family C's complexity. Listing-level summary verified on letta.com; article body not fetched"
  },
  {
   "date": "2025-08-12",
   "precision": "day",
   "title": "Fortune",
   "url": "https://fortune.com/2025/08/12/openai-gpt-5-model-router-backlash-ai-future/",
   "type": "news",
   "harness": [
    "Codex / OpenAI"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Reasoning-Effort Allocation"
   ],
   "established": "Fortune, Aug 12 2025; [OpenAI's GPT-5 router rollback](https://the-decoder.com/openais-gpt-5-router-rollback-shows-why-ai-requires-unlearning-old-habits/) - The Decoder. Real-time router for intelligence-per-dollar; buggy routing to cheaper"
  },
  {
   "date": "2025-08-26",
   "precision": "day",
   "title": "Building production-ready agentic systems: Lessons from Shopify Sidekick",
   "url": "https://shopify.engineering/building-production-ready-agentic-systems",
   "type": "web",
   "harness": [
    "Shopify"
   ],
   "layers": [
    1,
    3
   ],
   "capabilities": [
    "Context Curation",
    "Identity and Context"
   ],
   "established": "Shopify Engineering (Andrew McNamara; ICML 2025 talk with Lafferty and Garner), Aug 26 2025. \"Death by a Thousand Instructions\"; JIT instructions returned \"alongside tool data exactly when they're needed\"; \"not a token less, not a token mor"
  },
  {
   "date": "2025-09-01",
   "precision": "month",
   "title": "\"Was that helpful?\" Understanding User Feedback in Customer Support AI Agents",
   "url": "https://fin.ai/research/was-that-helpful-understanding-user-feedback-in-customer-support-ai-agents/",
   "type": "blog",
   "harness": [
    "Intercom Fin"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Implicit Signals"
   ],
   "established": "The assumed-resolution definition (leave-without-feedback-without-escalation read as success) and the $0.99-per-resolution pricing stake. The feedback-interpretation model itself is the Explicit Signals sibling's"
  },
  {
   "date": "2025-09-01",
   "precision": "month",
   "title": "The Hacker News",
   "url": "https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html",
   "type": "web",
   "harness": [
    "Microsoft"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "and [EchoLeak arXiv 2509.10540](https://arxiv.org/abs/2509.10540) - EchoLeak / CVE-2025-32711, CVSS 9.3, XPIA classifier bypass, \"LLM Scope Violation.\""
  },
  {
   "date": "2025-09-01",
   "precision": "month",
   "title": "To escalate, or not to escalate, that is the question",
   "url": "https://fin.ai/research/to-escalate-or-not-to-escalate-that-is-the-question/",
   "type": "blog",
   "harness": [
    "Intercom Fin"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Implicit Signals"
   ],
   "established": "The escalation router: LLM to fine-tuned small LLMs (97%) to encoder (98%) to multi-task ModernBERT on 4M examples; escalate/offer/continue; 8 reason categories; 90/10 hybrid with LLM fallback; A/B impact (resolution rate up p<0.01, latency"
  },
  {
   "date": "2025-09-11",
   "precision": "day",
   "title": "Anthropic, Writing effective tools for agents",
   "url": "https://www.anthropic.com/engineering/writing-tools-for-agents",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1,
    2,
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings",
    "Input and Output Gating",
    "Tool Discovery"
   ],
   "established": "Anthropic Engineering (Ken Aizawa), Sep 11 2025. The 25,000-token default cap on Claude Code tool responses (\"we restrict tool responses to 25,000 tokens by default\"); the durability claim (\"effective context length... will grow... the need"
  },
  {
   "date": "2025-09-26",
   "precision": "day",
   "title": "Cloudflare, Code Mode: the better way to use MCP",
   "url": "https://blog.cloudflare.com/code-mode/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Tool Discovery"
   ],
   "established": "MCP-as-TypeScript-API, \"too many tools... struggle to choose,\" Shakespeare-in-Mandarin, isolates sandbox"
  },
  {
   "date": "2025-09-29",
   "precision": "day",
   "title": "Managing context on the Claude Developer Platform",
   "url": "https://claude.com/blog/context-management",
   "type": "release",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Context Curation"
   ],
   "established": "Anthropic/Claude product announcement, Sep 29 2025. Context editing (\"automatically clears stale tool calls and results... preserving the conversation flow\") and the memory tool (client-side, file-based); measured effects: +39% combined, +2"
  },
  {
   "date": "2025-09-30",
   "precision": "day",
   "title": "reported via Simon Willison's roundup",
   "url": "https://simonwillison.net/2025/Sep/30/designing-agentic-loops/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Permission and Irreversibility"
   ],
   "established": "Simon Willison, Sep 30 2025. YOLO mode \"so dangerous, but also key to productive results\"; three risks (bad shell commands, exfiltration, proxy attacks); \"issuing tightly scoped credentials\" (test/staging creds, tight budget limits) = the I"
  },
  {
   "date": "2025-10-01",
   "precision": "month",
   "title": "The Reasoning Trap: How Enhancing LLM Reasoning Amplifies Tool Hallucination, arXiv:2510.22977",
   "url": "https://arxiv.org/abs/2510.22977",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Tool Discovery"
   ],
   "established": "Reasoning increases tool hallucination causally; SimpleToolHalluBench (no-tool / distractor-only); reliability-capability trade-off"
  },
  {
   "date": "2025-10-11",
   "precision": "day",
   "title": "Death by a Thousand Instructions",
   "url": "https://rishi.baldawa.com/posts/death-by-thousand-instructions/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Planning"
   ],
   "established": "Rishi Baldawa, Oct 11 2025. Quotes Shopify Engineering's \"Death by a Thousand Instructions\" and Steinberger's \"~800 lines... organizational scar tissue\"; the over-planning failure and the JIT-instructions fix"
  },
  {
   "date": "2025-10-20",
   "precision": "day",
   "title": "Aonan Guan",
   "url": "https://oddguan.com/blog/second-time-same-sandbox-anthropic-claude-code-network-allowlist-bypass-data-exfiltration/",
   "type": "blog",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "Aonan Guan, May 20 2026. SOCKS5 hostname null-byte injection (parser differential, JS endsWith vs libc getaddrinfo); every release v2.0.24-v2.1.89 vulnerable, ~5.5 months / ~130 versions, silent fix in v2.1.90, no Claude Code CVE/advisory; "
  },
  {
   "date": "2025-11-04",
   "precision": "day",
   "title": "Anthropic, Code execution with MCP: building more efficient agents",
   "url": "https://www.anthropic.com/engineering/code-execution-with-mcp",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Tool Discovery"
   ],
   "established": "150K->2K (98.7%), filesystem progressive disclosure, `search_tools` with detail level, Cloudflare Code Mode reference"
  },
  {
   "date": "2025-11-09",
   "precision": "day",
   "title": "Replace line-based tool output truncation with token-based limits",
   "url": "https://github.com/openai/codex/issues/6426",
   "type": "incident",
   "harness": [
    "Codex / OpenAI"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Input and Output Gating"
   ],
   "established": "openai/codex #6426, Nov 9 2025. Codex's 256-line/10 KiB head+tail cap; the migration toward `MODEL_FORMAT_MAX_TOKENS = 25_000` \"similar to how Claude Code handles this\"; the two failure faces named (head+tail \"can hide the most important in"
  },
  {
   "date": "2025-11-14",
   "precision": "day",
   "title": "The AI Agent That Cost $47,000 While Everyone Thought It Was Working",
   "url": "https://dev.to/utibe_okodi_339fb47a13ef5/the-ai-agent-that-cost-47000-while-everyone-thought-it-was-working-1lg6",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Tool Dispatch and Retry"
   ],
   "established": ""
  },
  {
   "date": "2025-11-24",
   "precision": "day",
   "title": "Anthropic, Introducing advanced tool use on the Claude Developer Platform",
   "url": "https://www.anthropic.com/engineering/advanced-tool-use",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Tool Discovery"
   ],
   "established": "Tool Search Tool, ~85% reduction, 134K-token figure, 58-tool/~55K example, near-identical-name failure, Opus 4 49%->74% / Opus 4.5 79.5%->88.1%, Programmatic Tool Calling 43,588->27,297 (37%) and GIA 46.5%->51.2%, Tool Use Examples 72%->90%"
  },
  {
   "date": "2025-11-24",
   "precision": "day",
   "title": "Mitigating the risk of prompt injections in browser use",
   "url": "https://www.anthropic.com/research/prompt-injection-defenses",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "Anthropic, Nov 24 2025. Family A and B in first-party voice: RL-trained injection robustness; classifiers that \"scan all untrusted content that enters the model's context window\"; scaled human red teaming; Opus 4.5 robustness, ASR toward 1%"
  },
  {
   "date": "2025-11-25",
   "precision": "day",
   "title": "WRITER, When too many tools become too much context",
   "url": "https://writer.com/engineering/rag-mcp/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Tool Discovery"
   ],
   "established": "Independent restatement of RAG-MCP (triples accuracy, >50% fewer tokens), \"context rot,\" MCP Gateway meta-tools via vector retrieval + Palmyra X5 rewriting"
  },
  {
   "date": "2025-12-01",
   "precision": "month",
   "title": "Context Compaction Research: Claude Code, Codex CLI, OpenCode, Amp",
   "url": "https://gist.github.com/badlogic/cd2ef65b0697c4dbe2d13fbecb0a0a5f",
   "type": "code",
   "harness": [
    "Claude Code",
    "Codex / OpenAI"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Compression for Coherence"
   ],
   "established": "Mario Zechner, Dec 2025. Cross-tool prompts verbatim (Codex's compact templates and summary prefix, OpenCode's compaction prompt and final user message); Claude Code's earlier ~95% trigger and the go-off-the-rails / cumulative-degradation o"
  },
  {
   "date": "2025-12-01",
   "precision": "month",
   "title": "Cursor Plan Mode destructive operations",
   "url": "https://www.mintmcp.com/blog/cursor-plan-mode-destructive-operations",
   "type": "blog",
   "harness": [
    "Cursor"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Permission and Irreversibility"
   ],
   "established": "the Dec 2025 Plan Mode enforcement bug"
  },
  {
   "date": "2025-12-01",
   "precision": "day",
   "title": "awesome-agent-failures case study",
   "url": "https://github.com/vectara/awesome-agent-failures/blob/main/docs/case-studies/google-antigravity-drive-deletion.md",
   "type": "code",
   "harness": [
    "Google"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Permission and Irreversibility"
   ],
   "established": "vectara/awesome-agent-failures, Dec 2025. Tassos M D:-drive wipe; `rmdir /s /q d:\\` path-parsing error; Turbo mode \"no human-in-the-loop\"; tiered-confirmation recommendation (SAFE / NEEDS_CONFIRMATION / ALWAYS_BLOCKED); the agent's \"I am de"
  },
  {
   "date": "2025-12-02",
   "precision": "day",
   "title": "Letta, Skill Learning, Dec 2 2025",
   "url": "https://www.letta.com/blog/skill-learning",
   "type": "blog",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Offline Consolidation"
   ],
   "established": ""
  },
  {
   "date": "2025-12-18",
   "precision": "day",
   "title": "Project Vend: Phase two",
   "url": "https://www.anthropic.com/research/project-vend-2",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1,
    2
   ],
   "capabilities": [
    "Identity and Context",
    "Permission and Irreversibility"
   ],
   "established": "Anthropic Frontier Red Team, Dec 18 2025"
  },
  {
   "date": "2026-01-01",
   "precision": "year",
   "title": "Pluto Security",
   "url": "https://pluto.security/blog/securing-claude-managed-agents/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Permission and Irreversibility"
   ],
   "established": ""
  },
  {
   "date": "2026-01-01",
   "precision": "month",
   "title": "arXiv 2601.05606",
   "url": "https://arxiv.org/abs/2601.05606",
   "type": "research",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Cross-Agent Coherence"
   ],
   "established": ""
  },
  {
   "date": "2026-01-09",
   "precision": "day",
   "title": "Demystifying evals for AI agents",
   "url": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Observability and Offline Evaluation"
   ],
   "established": "Anthropic Engineering, Jan 9 2026 . Capability vs regression evals, graduation, \"flying blind,\" harness-and-model-together, eval hygiene, framework appendix (Harbor, Braintrust, LangSmith, Langfuse, Arize)"
  },
  {
   "date": "2026-02-01",
   "precision": "month",
   "title": "Response size limit for MCP responses to prevent context overflow in AI Agents",
   "url": "https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/2211",
   "type": "code",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Input and Output Gating"
   ],
   "established": "modelcontextprotocol #2211, Feb 2026. The pre-gate proposal (`max_response_bytes` 256-512KB, fail-fast structured error); the offload-as-middleware pattern (Sift artifacts, \"copilot CLI stuffs large outputs in a temp file\"); the honest admi"
  },
  {
   "date": "2026-02-01",
   "precision": "month",
   "title": "vectara/awesome-agent-failures",
   "url": "https://github.com/vectara/awesome-agent-failures",
   "type": "code",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "vectara. Google Antigravity sandbox escape + persistent host RCE via find_by_name `-X` flag bypassing Strict Mode (patched Feb 2026); also catalogs the Ona escape, PocketOS, and the Alibaba self-exfiltration crypto-mining sandbox breakout"
  },
  {
   "date": "2026-02-02",
   "precision": "day",
   "title": "AI Digest",
   "url": "https://theaidigest.org/village/blog/what-we-learned-2025",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Cross-Agent Coherence",
    "State Persistence and Ownership"
   ],
   "established": "The AI Digest (Shoshannah Tekofsky), Feb 2 2026. The o3 93-person contact list (\"sycophantic agreement spread the false belief to every agent, wasting 8+ hours\"); \"Hallucinations spread socially through sycophantic agreement. A single unrel"
  },
  {
   "date": "2026-02-05",
   "precision": "day",
   "title": "Hashimoto, My AI Adoption Journey, Feb 5 2026",
   "url": "https://mitchellh.com/writing/my-ai-adoption-journey",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Compounding Fixes"
   ],
   "established": ""
  },
  {
   "date": "2026-02-05",
   "precision": "day",
   "title": "Snyk",
   "url": "https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "Snyk (Luca Beurer-Kellner, Liran Tal, et al.), Feb 5 2026. 3,984 skills scanned; 36.82% (1,467) any flaw, 13.4% (534) critical, 76 confirmed malicious payloads, 8 still live; \"100% of confirmed malicious skills contain malicious code... 91%"
  },
  {
   "date": "2026-02-10",
   "precision": "day",
   "title": "Claude Code docs, Memory",
   "url": "https://code.claude.com/docs/en/memory",
   "type": "docs",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": ""
  },
  {
   "date": "2026-02-10",
   "precision": "day",
   "title": "Letta, Continual Learning",
   "url": "https://www.letta.com/blog/continual-learning",
   "type": "blog",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "Letta, Dec 11 2025. \"Agents that can carry their memories across model generations will outlast any single foundation model. The weights are temporary; the learned context is what persists\"; portability (\"model-agnostic... weight-based lear"
  },
  {
   "date": "2026-02-10",
   "precision": "day",
   "title": "Microsoft Security Blog",
   "url": "https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/",
   "type": "blog",
   "harness": [
    "Microsoft"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "Microsoft Defender Security Research Team, Feb 10 2026. 50 prompts, 31 companies, 14 industries over 60 days; the one-click `?q=` vector across Copilot/ChatGPT/Claude/Perplexity/Grok; MITRE ATLAS AML.T0080; CiteMET tooling (\"SEO growth hack"
  },
  {
   "date": "2026-02-11",
   "precision": "day",
   "title": "anthropics/claude-code#25000",
   "url": "https://github.com/anthropics/claude-code/issues/25000",
   "type": "incident",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Wont Do - Safety"
   ],
   "established": ""
  },
  {
   "date": "2026-02-12",
   "precision": "day",
   "title": "Claude claims to write plan file, never executes Write tool, plan lost on context compaction",
   "url": "https://github.com/anthropics/claude-code/issues/25265",
   "type": "incident",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Context Curation"
   ],
   "established": "anthropics/claude-code #25265 (macgeek7), Feb 12 2026, v2.1.39, Opus. Plan existed only in conversation despite an explicit persist-as-file rule; Sprints 3-5 (21 tasks) lost at compaction; recovered via grep on raw JSONL; \"the failure only "
  },
  {
   "date": "2026-02-12",
   "precision": "day",
   "title": "Context Repositories: Git-based Memory for Coding Agents",
   "url": "https://www.letta.com/blog/context-repositories",
   "type": "blog",
   "harness": [
    "Letta"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "Letta, Feb 12 2026. Git-versioned memory for Letta Code. Listing verified"
  },
  {
   "date": "2026-02-17",
   "precision": "day",
   "title": "LangChain, Improving Deep Agents with harness engineering, Feb 17 2026",
   "url": "https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering",
   "type": "blog",
   "harness": [
    "LangChain"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Compounding Fixes",
    "Observability and Offline Evaluation"
   ],
   "established": "LangChain (Vivek Trivedy), Feb 17 2026 . Traces-at-scale, the Trace Analyzer Skill, 52.8→66.5 on Terminal-Bench 2.0 with the model fixed"
  },
  {
   "date": "2026-02-23",
   "precision": "day",
   "title": "Effective context engineering",
   "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    3,
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings",
    "Compression for Coherence",
    "Context Curation"
   ],
   "established": "Anthropic Engineering, Sep 29 2025. Context rot and the attention budget; compaction defined and Claude Code's implementation (\"compressed context plus the five most recently accessed files\"); \"overly aggressive compaction can result in the"
  },
  {
   "date": "2026-02-23",
   "precision": "day",
   "title": "TechCrunch",
   "url": "https://techcrunch.com/2026/02/23/a-meta-ai-security-researcher-said-an-openclaw-agent-ran-amok-on-her-inbox/",
   "type": "news",
   "harness": [
    "OpenClaw"
   ],
   "layers": [
    2,
    3,
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings",
    "Compression for Coherence",
    "Context Curation",
    "Permission and Irreversibility",
    "Wont Do - Safety"
   ],
   "established": "TechCrunch (Julie Bort), Feb 23 2026. Summer Yue incident: the \"don't action until I tell you to\" instruction; compaction dropped it; 200+ emails deleted; ignored \"Stop don't do anything\" and \"STOP OPENCLAW\"; \"RUN to my Mac mini like I was "
  },
  {
   "date": "2026-02-25",
   "precision": "day",
   "title": "Check Point Research",
   "url": "https://research.checkpoint.com/2026/rce-and-api-token-exfiltration-through-claude-code-project-files-cve-2025-59536/",
   "type": "web",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    2,
    4
   ],
   "capabilities": [
    "Compounding Fixes",
    "Execution Security"
   ],
   "established": "Check Point Research (Aviv Donenfeld, Oded Vanunu), Feb 25 2026. Three config-file vulns: untrusted-hook RCE, MCP consent bypass, and `ANTHROPIC_BASE_URL` API-key exfiltration \"before the user could even read the trust dialog\"; \"developers "
  },
  {
   "date": "2026-02-27",
   "precision": "day",
   "title": "BetterClaw, Feb 27 2026",
   "url": "https://www.betterclaw.io/blog/openclaw-memory-fix",
   "type": "blog",
   "harness": [
    "OpenClaw"
   ],
   "layers": [
    3,
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings",
    "Compression for Coherence"
   ],
   "established": "BetterClaw (Shabnam Katoch), Feb 27 2026. The first-person three-hour-research-loss incident and log line; OpenClaw issue #25633 framing (\"context compaction silently destroys active work mid-session\"); \"kept the vibes but lost the facts\"; "
  },
  {
   "date": "2026-03-05",
   "precision": "day",
   "title": "How Codex Solves the Compaction Problem Differently",
   "url": "https://tonylee.im/en/blog/codex-compaction-encrypted-summary-session-handover/",
   "type": "blog",
   "harness": [
    "Codex / OpenAI"
   ],
   "layers": [
    3,
    5
   ],
   "capabilities": [
    "State Persistence and Ownership",
    "Wont Show - Opacity"
   ],
   "established": "Tony Lee, Mar 5 2026 (crediting Kangwook Lee's injection analysis). The encrypted compaction pipeline; \"the encryption key lives on OpenAI's servers. The client never sees the plaintext summary\"; the contrast with Claude Code's human-readab"
  },
  {
   "date": "2026-03-13",
   "precision": "day",
   "title": "AutoResearch / program.md",
   "url": "https://github.com/karpathy/autoresearch/blob/master/program.md",
   "type": "code",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Tool Dispatch and Retry"
   ],
   "established": ""
  },
  {
   "date": "2026-03-13",
   "precision": "day",
   "title": "The New Stack",
   "url": "https://thenewstack.io/claude-million-token-pricing/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings"
   ],
   "established": ""
  },
  {
   "date": "2026-03-16",
   "precision": "day",
   "title": "Is my data used for model training?",
   "url": "https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Explicit Signals"
   ],
   "established": "Anthropic Privacy Center, updated Mar 16 2026. Thumbs up/down stores the entire related conversation up to 5 years, de-linked from user ID; \"we may use your feedback to... train our AI models\"; feedback not combined with other conversations"
  },
  {
   "date": "2026-03-19",
   "precision": "day",
   "title": "anomalyco/opencode#18186",
   "url": "https://github.com/anomalyco/opencode/pull/18186",
   "type": "incident",
   "harness": [
    "research / general"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Wont Do - Commercial"
   ],
   "established": ""
  },
  {
   "date": "2026-03-24",
   "precision": "day",
   "title": "Harness design for long-running application development",
   "url": "https://www.anthropic.com/engineering/harness-design-long-running-apps",
   "type": "blog",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    1,
    3,
    4
   ],
   "capabilities": [
    "Compression for Coherence",
    "Cross-Agent Coherence",
    "Orchestration Routing",
    "Reasoning-Effort Allocation",
    "Runtime Evaluation"
   ],
   "established": "Anthropic Engineering (Prithvi Rajasekaran), Mar 24 2026. Sprint-decomposition removal, \"the resets had become dead weight,\" \"$9/20min solo vs $200/6hr full harness\" (over 20x), \"every component in a harness encodes an assumption about what"
  },
  {
   "date": "2026-03-25",
   "precision": "day",
   "title": "How we built Claude Code auto mode: a safer way to skip permissions",
   "url": "https://www.anthropic.com/engineering/claude-code-auto-mode",
   "type": "blog",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    1,
    2,
    4,
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings",
    "Explicit Signals",
    "Observability and Offline Evaluation",
    "Permission and Irreversibility",
    "Planning",
    "Runtime Evaluation"
   ],
   "established": "Anthropic Engineering (John Hughes), Mar 25 2026. Internal incident log (\"deleting remote git branches from a misinterpreted instruction... attempting migrations against a production database\"); plan-mode transitions on the safe-tool allowl"
  },
  {
   "date": "2026-03-31",
   "precision": "day",
   "title": "AWS Builders' Library",
   "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Tool Dispatch and Retry"
   ],
   "established": ""
  },
  {
   "date": "2026-03-31",
   "precision": "day",
   "title": "Anthropic Compaction docs",
   "url": "https://platform.claude.com/docs/en/build-with-claude/compaction",
   "type": "docs",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Compression for Coherence"
   ],
   "established": "Anthropic API docs (beta `compact-2026-01-12`). Server-side compaction mechanics; default 150,000-token trigger with a 50,000 floor; the default summarization prompt; custom `instructions`; `pause_after_compaction` for client-side preservat"
  },
  {
   "date": "2026-03-31",
   "precision": "day",
   "title": "Phoenix Security",
   "url": "https://phoenix.security/claude-code-leak-to-vulnerability-three-cves-in-claude-code-cli-and-the-chain-that-connects-them/",
   "type": "web",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "Phoenix Security (Francesco Cipollone), Apr 6 2026. The source-map leak (59.8 MB cli.js.map, 512K lines, 50K GitHub stars in 2 hours); three CWE-78 command injections (`TERMINAL`, editor path, `apiKeyHelper`) chaining to credential/SSH-key/"
  },
  {
   "date": "2026-03-31",
   "precision": "day",
   "title": "The Claude Code Source Leak",
   "url": "https://alex000kim.com/posts/2026-03-31-claude-code-source-leak/",
   "type": "leak",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    2,
    3,
    4,
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings",
    "Compounding Fixes",
    "Compression for Coherence",
    "Implicit Signals",
    "Observability and Offline Evaluation",
    "Offline Consolidation",
    "Tool Dispatch and Retry",
    "Wont Do - Commercial"
   ],
   "established": "The exact `autoCompact.ts` comment (\"1,279 sessions had 50+ consecutive failures (up to 3,272)... wasting ~250K API calls/day globally\") and the fix (`MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3`, disable compaction for the session after 3). A"
  },
  {
   "date": "2026-03-31",
   "precision": "day",
   "title": "We Dug Into Claude Code's Source Code. Anthropic Built a Full Frustration Detection System.",
   "url": "https://agnost.ai/blog/claude-code-frustration-detection-source-code/",
   "type": "blog",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Implicit Signals"
   ],
   "established": "The fullest inventory of the leaked signal stack: `useIssueFlagBanner.ts` correction-tone phrases and the issue banner; `tengu_input_prompt` with `is_negative: true`; the 0.5% session survey with bad-rating transcript upload; `/insights` fi"
  },
  {
   "date": "2026-03-31",
   "precision": "day",
   "title": "claude-code issue #43220",
   "url": "https://github.com/anthropics/claude-code/issues/43220",
   "type": "incident",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Implicit Signals"
   ],
   "established": ""
  },
  {
   "date": "2026-04-01",
   "precision": "day",
   "title": "Claude Code is scanning your messages for curse words",
   "url": "https://www.pcworld.com/article/3104748/claude-code-is-scanning-your-messages-for-curse-words.html",
   "type": "web",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Implicit Signals"
   ],
   "established": "Mainstream confirmation of the regex; explicitly notes the leak shows the mechanism but not its purpose, and that Anthropic did not comment"
  },
  {
   "date": "2026-04-01",
   "precision": "day",
   "title": "Claude Knows When You're Mad, And Uses Regex, Not AI",
   "url": "https://dev.to/toji_openclaw_fd3ff67586a/claude-knows-when-youre-mad-and-uses-regex-not-ai-2klc",
   "type": "web",
   "harness": [
    "OpenClaw"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Implicit Signals"
   ],
   "established": "The cost-ladder framing (regex vs classifier vs LLM inference) and \"nobody types 'what the fuck' calmly.\" Riskiest source in the set; see Thin spots"
  },
  {
   "date": "2026-04-01",
   "precision": "month",
   "title": "Claude Mythos Preview",
   "url": "https://red.anthropic.com/2026/mythos-preview/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "red.anthropic.com, Apr 2026. Model escaped its sandbox in red-team eval, built exploit chain, gained network access, self-published; not shipped broadly"
  },
  {
   "date": "2026-04-01",
   "precision": "month",
   "title": "Context Management in Agent Harnesses",
   "url": "https://twitter-thread.com/t/2048492731929149929",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Compression for Coherence"
   ],
   "established": "Aparna Dhinakaran (Arize), Apr 2026, via thread reader. The four-harness comparison: Claude Code's 13,000-token buffer / ~167K trigger, nine-section prompt, scratchpad-stripped two-pass, 5-file restoration, PTL head-drop (\"20% of groups or "
  },
  {
   "date": "2026-04-01",
   "precision": "day",
   "title": "Hacker News Dissects the Claude Code Leak",
   "url": "https://insights.marvin-42.com/articles/hacker-news-dissects-the-claude-code-leak-and-the-anti-distillation-logic-behind-it",
   "type": "leak",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4,
    5
   ],
   "capabilities": [
    "Observability and Offline Evaluation",
    "Wont Show - Opacity"
   ],
   "established": "marvin-42 Insights, Apr 1 2026 . \"Continuously measured product surface\"; the live-service trust shift (the L5 echo)"
  },
  {
   "date": "2026-04-02",
   "precision": "day",
   "title": "Comprehensive Analysis of Claude Code Source Leak",
   "url": "https://www.sabrina.dev/p/claude-code-source-leak-analysis",
   "type": "leak",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Implicit Signals"
   ],
   "established": "Independent confirmation of `userPromptKeywords.ts` (27 lines), invocation from `processTextPrompt.ts:59`, the `tengu_input_prompt` / `is_negative: true` event, and the `autoCompact.ts` comment with file and line"
  },
  {
   "date": "2026-04-03",
   "precision": "day",
   "title": "Claude Code sandboxing",
   "url": "https://www.anthropic.com/engineering/claude-code-sandboxing",
   "type": "blog",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "Anthropic Engineering (David Dworken, Oliver Weller-Davies), Oct 20 2025. Sandboxing reduces permission prompts 84%; filesystem + network isolation, and \"effective sandboxing requires both\"; OS primitives (bubblewrap, Seatbelt) covering sub"
  },
  {
   "date": "2026-04-03",
   "precision": "day",
   "title": "GitHub Copilot allowlist reference",
   "url": "https://docs.github.com/en/copilot/reference/copilot-allowlist-reference",
   "type": "code",
   "harness": [
    "Microsoft"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Permission and Irreversibility"
   ],
   "established": "and [Organization firewall settings for Copilot cloud agent](https://github.blog/changelog/2026-04-03-organization-firewall-settings-for-copilot-cloud-agent/) - GitHub. Firewall + recommended allowlist on by default; org-wide management; PR"
  },
  {
   "date": "2026-04-03",
   "precision": "day",
   "title": "Organization firewall settings for Copilot cloud agent",
   "url": "https://github.blog/changelog/2026-04-03-organization-firewall-settings-for-copilot-cloud-agent/",
   "type": "web",
   "harness": [
    "Microsoft"
   ],
   "layers": [
    2,
    5
   ],
   "capabilities": [
    "Isolation",
    "Wont Do - Safety"
   ],
   "established": "and [Customizing the firewall for Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall) - GitHub. Built-in agent firewall vs exfiltration/injection; recommended allowl"
  },
  {
   "date": "2026-04-04",
   "precision": "day",
   "title": "TNW, Apr 4 2026",
   "url": "https://thenextweb.com/news/anthropic-openclaw-claude-subscription-ban-cost",
   "type": "release",
   "harness": [
    "OpenClaw"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Wont Do - Commercial"
   ],
   "established": ""
  },
  {
   "date": "2026-04-04",
   "precision": "day",
   "title": "openai/codex issue #16812, Apr 4 2026",
   "url": "https://github.com/openai/codex/issues/16812",
   "type": "incident",
   "harness": [
    "Codex / OpenAI"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Compression for Coherence"
   ],
   "established": "r0b0c0ck, Apr 4 2026. The v0.118 cascading-compaction regression with session data (4 -> 12-26 compactions; 89M -> 160-185M tokens; the self-reinforcing compaction-reread cycle; ~150KB essential files re-read after every compaction)"
  },
  {
   "date": "2026-04-06",
   "precision": "day",
   "title": "TechTalks, Apr 6 2026",
   "url": "https://bdtechtalks.com/2026/04/06/ai-harness-engineering-claude-code-leak/",
   "type": "web",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Offline Consolidation"
   ],
   "established": ""
  },
  {
   "date": "2026-04-08",
   "precision": "day",
   "title": "Scaling Managed Agents: Decoupling the brain from the hands",
   "url": "https://www.anthropic.com/engineering/managed-agents",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "Anthropic Engineering (Lance Martin, Gabe Cemaj, Michael Cohen), Apr 8 2026. The thesis centerpiece: the staleable-to-structural token conversion verbatim (\"encodes an assumption about what Claude can't do with a limited token, and Claude i"
  },
  {
   "date": "2026-04-09",
   "precision": "day",
   "title": "OpenClaw Compaction docs",
   "url": "https://docs.openclaw.ai/concepts/compaction",
   "type": "docs",
   "harness": [
    "OpenClaw"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Compression for Coherence"
   ],
   "established": ""
  },
  {
   "date": "2026-04-09",
   "precision": "day",
   "title": "Shedding Heavy Memories: Context Compaction in Codex, Claude Code, and OpenCode",
   "url": "https://justin3go.com/en/posts/2026/04/09-context-compaction-in-codex-claude-code-and-opencode",
   "type": "blog",
   "harness": [
    "Claude Code",
    "Codex / OpenAI"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Compression for Coherence"
   ],
   "established": "Justin3go, Apr 9 2026 (leaked-source-verified for Claude Code). The three-tier Claude Code system (zero-LLM trimming placeholders, cache-friendly tail-cutting, nine-section last resort); the threshold formula (effective window minus 13,000,"
  },
  {
   "date": "2026-04-11",
   "precision": "day",
   "title": "Compaction silently deactivates plan mode",
   "url": "https://github.com/anthropics/claude-code/issues/46663",
   "type": "incident",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Context Curation"
   ],
   "established": "anthropics/claude-code #46663 (Arslan-ai), Apr 11 2026, v2.1.101, has-repro. Mode state not carried across compaction; \"no error, plan mode simply disappears\"; plan file present at `.claude/plans/` but unfollowed; regression from removing \""
  },
  {
   "date": "2026-04-11",
   "precision": "day",
   "title": "anthropics/claude-code#46829",
   "url": "https://github.com/anthropics/claude-code/issues/46829",
   "type": "incident",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Wont Show - Opacity"
   ],
   "established": ""
  },
  {
   "date": "2026-04-14",
   "precision": "day",
   "title": "Context Compaction Deep Dive: Codex CLI, Claude Code, OpenCode",
   "url": "https://codex.danielvaughan.com/2026/04/14/context-compaction-deep-dive-codex-cli-claude-code-opencode/",
   "type": "web",
   "harness": [
    "Claude Code",
    "Codex / OpenAI"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Compression for Coherence"
   ],
   "established": "Daniel Vaughan, Apr 14 2026 (updated May 24). Codex's encrypted `POST /v1/responses/compact` blob and its rationale (tamper prevention, richer state, server-side iteration); the cross-tool comparison table; compact-at-60-percent practitione"
  },
  {
   "date": "2026-04-14",
   "precision": "day",
   "title": "GitGuardian via Help Net Security",
   "url": "https://www.helpnetsecurity.com/2026/04/14/gitguardian-ai-agents-credentials-leak/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "Help Net Security / GitGuardian (Dwayne McDaniel), Apr 14 2026. 28,649,024 secrets in public commits (+34% YoY); Claude-Code-co-authored commits leak at ~2x baseline; 24,008 secrets in MCP config files (2,100+ valid); agent-platform tokens "
  },
  {
   "date": "2026-04-15",
   "precision": "day",
   "title": "Fastio",
   "url": "https://fast.io/resources/best-code-execution-sandboxes-ai-agents/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": ""
  },
  {
   "date": "2026-04-15",
   "precision": "day",
   "title": "How to sandbox AI agents",
   "url": "https://northflank.com/blog/how-to-sandbox-ai-agents",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "and [Best code execution sandboxes for AI agents](https://fast.io/resources/best-code-execution-sandboxes-ai-agents/) (Fastio) and [Multi-Agent gVisor Isolation (MAGI)](https://gvisor.dev/blog/2026/04/15/magi-multi-agent-gvisor-isolation/) "
  },
  {
   "date": "2026-04-17",
   "precision": "day",
   "title": "A Claude Code plugin for filing better feedback to Anthropic",
   "url": "https://www.heyitworks.tech/blog/claude-code-feedback-plugin",
   "type": "blog",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Explicit Signals"
   ],
   "established": "Daniel Rosehill, Apr 17 2026. The friction tax in the wild: \"most of the bugs and feature ideas I notice in a session never get filed. I'm busy; the friction wins\"; the in-session filing plugin against live Anthropic issue templates; \"lower"
  },
  {
   "date": "2026-04-23",
   "precision": "day",
   "title": "Anthropic April 23 post-mortem",
   "url": "https://www.anthropic.com/engineering/april-23-postmortem",
   "type": "blog",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Explicit Signals",
    "Observability and Offline Evaluation"
   ],
   "established": "Anthropic Engineering, Apr 23 2026. The capstone source: three harness regressions undetected by internal evals, code review, tests, and dogfooding; reports \"challenging to distinguish from normal variation in user feedback\"; the effort-def"
  },
  {
   "date": "2026-04-23",
   "precision": "day",
   "title": "Built-in memory for Claude Managed Agents",
   "url": "https://claude.com/blog/claude-managed-agents-memory",
   "type": "release",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "claude.com, Apr 23 2026. Public beta; filesystem-mounted memory in the agent container; \"memories are stored as files, developers can export them, manage them via the API, and keep full control\"; scoped permissions (org read-only, per-user "
  },
  {
   "date": "2026-04-24",
   "precision": "day",
   "title": "BenchLM, Apr 24 2026",
   "url": "https://benchlm.ai/blog/posts/context-window-comparison",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Cant Do - Ceilings"
   ],
   "established": "BenchLM (Glevd), Apr 24 2026. The advertised-vs-effective gap stated sharply (\"the marketing number does not move when the recall curve falls off a cliff\"); the 80%-fill smoke-test rule; the three mechanisms (attention dilution, positional "
  },
  {
   "date": "2026-04-25",
   "precision": "day",
   "title": "Railway",
   "url": "https://blog.railway.com/p/your-ai-wants-to-nuke-your-database",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation",
    "Permission and Irreversibility"
   ],
   "established": "Railway (Mahmoud Abdelwahab), Apr 29 2026. The four token layers verbatim (account / workspace / project / OAuth, broadest to narrowest); \"the token was provisioned with account scoped access, the maximum access possible\"; legacy-endpoint b"
  },
  {
   "date": "2026-04-25",
   "precision": "day",
   "title": "Zenity",
   "url": "https://zenity.io/blog/current-events/ai-agent-database-deletion-pocketos",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1,
    2,
    5
   ],
   "capabilities": [
    "Permission and Irreversibility",
    "Planning",
    "Wont Do - Safety"
   ],
   "established": "Zenity (Chris Hughes), Apr 28 2026. PocketOS 9-second deletion, Cursor + Opus 4.6, unscoped Railway token, agent's confession; December 2025 Cursor Plan Mode bypass (\"DO NOT RUN ANYTHING\"); \"soft guardrails can steer behavior, but they cann"
  },
  {
   "date": "2026-04-25",
   "precision": "day",
   "title": "anthropics/claude-code#53262",
   "url": "https://github.com/anthropics/claude-code/issues/53262",
   "type": "incident",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Wont Do - Commercial",
    "Wont Show - Opacity"
   ],
   "established": ""
  },
  {
   "date": "2026-04-28",
   "precision": "day",
   "title": "Anthropic adds memory to Claude Managed Agents",
   "url": "https://www.techzine.eu/news/devops/140836/anthropic-adds-memory-to-claude-managed-agents/",
   "type": "release",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "State Persistence and Ownership"
   ],
   "established": "Techzine, Apr 28 2026. Independent press corroboration of the export/API-control claims and the audit-log mechanics"
  },
  {
   "date": "2026-04-28",
   "precision": "day",
   "title": "Context management in agent harnesses: memory, files, and subagents",
   "url": "https://arize.com/blog/context-management-in-agent-harnesses/",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2,
    3
   ],
   "capabilities": [
    "Context Curation",
    "Input and Output Gating"
   ],
   "established": "Arize AI (Aparna Dhinakaran), Apr 28 2026. The canonical cross-harness source. Claude Code's 256KB byte gate (stat before open) + 25K token gate + GrowthBook tunability + dedup + 2,000-line/2,000-char defaults + disk offload (2KB preview, 5"
  },
  {
   "date": "2026-04-29",
   "precision": "day",
   "title": "LangChain, Tuning Deep Agents to Work Well with Different Models",
   "url": "https://www.langchain.com/blog/tuning-deep-agents-different-models",
   "type": "blog",
   "harness": [
    "LangChain"
   ],
   "layers": [
    1,
    4
   ],
   "capabilities": [
    "Compounding Fixes",
    "Observability and Offline Evaluation",
    "Orchestration Routing"
   ],
   "established": "LangChain (Vivek Trivedy, Mason Daugherty), Apr 29 2026. gpt-5.2-codex 52.8% -> 66.5% on Terminal-Bench 2.0 (13.7-point jump) by harness changes alone; harness profiles; \"Claude Code harness ranks last among Opus 4.6 submissions.\""
  },
  {
   "date": "2026-05-01",
   "precision": "month",
   "title": "Anthropic Traces Six Weeks of Claude Code Quality Complaints to Three Overlapping Product Changes",
   "url": "https://www.infoq.com/news/2026/05/anthropic-claude-code-postmortem/",
   "type": "release",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Explicit Signals"
   ],
   "established": "InfoQ, May 2026. Independent coverage of the post-mortem; \"users reported wildly different symptoms\"; Cherny's HN follow-up on the cache-miss economics"
  },
  {
   "date": "2026-05-01",
   "precision": "month",
   "title": "Claude Code commands",
   "url": "https://code.claude.com/docs/en/commands",
   "type": "docs",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Explicit Signals"
   ],
   "established": ""
  },
  {
   "date": "2026-05-01",
   "precision": "month",
   "title": "Ultrareview docs",
   "url": "https://code.claude.com/docs/en/ultrareview",
   "type": "docs",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Runtime Evaluation"
   ],
   "established": ""
  },
  {
   "date": "2026-05-03",
   "precision": "day",
   "title": "MindStudio, May 3 2026",
   "url": "https://www.mindstudio.ai/blog/anthropic-confirms-claude-code-scanning-git-commits-openclaw-hermes",
   "type": "blog",
   "harness": [
    "Claude Code",
    "OpenClaw"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Wont Do - Commercial"
   ],
   "established": ""
  },
  {
   "date": "2026-05-03",
   "precision": "day",
   "title": "Outcomes: agents that verify their own work",
   "url": "https://platform.claude.com/cookbook/managed-agents-cma-verify-with-outcome-grader",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Runtime Evaluation"
   ],
   "established": "Claude Cookbook (Mark Nowicki, Gagan Bhat), May 3 2026. \"Agents are good at producing things that look done\"; \"The default failure mode is a grader that approves everything\"; \"make the grader earn satisfied\"; the 8-K-vs-10-K rejection walkt"
  },
  {
   "date": "2026-05-06",
   "precision": "day",
   "title": "Anthropic Dreams docs",
   "url": "https://platform.claude.com/docs/en/managed-agents/dreams",
   "type": "docs",
   "harness": [
    "research / general"
   ],
   "layers": [
    3
   ],
   "capabilities": [
    "Offline Consolidation"
   ],
   "established": ""
  },
  {
   "date": "2026-05-06",
   "precision": "day",
   "title": "Atlassian Teamwork Graph: The context engine behind your AI - everywhere",
   "url": "https://www.atlassian.com/blog/company-news/teamwork-graph-team-26",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Identity and Context"
   ],
   "established": "Atlassian (Jamil Valliani), May 6 2026"
  },
  {
   "date": "2026-05-06",
   "precision": "day",
   "title": "Why Atlassian is letting Claude Code into its own data graph",
   "url": "https://thenewstack.io/atlassian-teamwork-graph-agents/",
   "type": "web",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Identity and Context"
   ],
   "established": "The New Stack (Frederic Lardinois), May 6 2026"
  },
  {
   "date": "2026-05-12",
   "precision": "day",
   "title": "anthropics/claude-code#58383",
   "url": "https://github.com/anthropics/claude-code/issues/58383",
   "type": "incident",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4,
    5
   ],
   "capabilities": [
    "Compounding Fixes",
    "Wont Show - Opacity"
   ],
   "established": ""
  },
  {
   "date": "2026-05-20",
   "precision": "day",
   "title": "Even Claude agrees: hole in its sandbox was real",
   "url": "https://www.theregister.com/security/2026/05/20/even-claude-agrees-hole-in-its-sandbox-was-real-and-dangerous/",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "and [Anthropic Silently Patches Claude Code Sandbox Bypass](https://www.securityweek.com/anthropic-silently-patches-claude-code-sandbox-bypass/) (SecurityWeek) - press corroboration of the SOCKS5 bypass"
  },
  {
   "date": "2026-05-21",
   "precision": "day",
   "title": "Why Intercom Fin's Resolution Rate Has a Documentation Problem",
   "url": "https://happysupport.ai/blog/intercom-fin-accuracy-documentation-problem",
   "type": "blog",
   "harness": [
    "Intercom Fin"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Identity and Context"
   ],
   "established": "HappySupport (Henrik Roth), May 21 2026"
  },
  {
   "date": "2026-05-25",
   "precision": "day",
   "title": "How we contain Claude across products",
   "url": "https://www.anthropic.com/engineering/how-we-contain-claude",
   "type": "blog",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Isolation"
   ],
   "established": "Anthropic Engineering (Max McGuinness et al.), May 25 2026. The single best source for this capability. The two-ways-to-cap-blast-radius framing (supervise behavior vs supervise capability/containment); three isolation patterns (gVisor ephe"
  },
  {
   "date": "2026-05-25",
   "precision": "day",
   "title": "Stop Runaway AI Agent Costs",
   "url": "https://www.supra-wall.com/en/learn/ai-agent-runaway-costs",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Tool Dispatch and Retry"
   ],
   "established": ""
  },
  {
   "date": "2026-05-26",
   "precision": "day",
   "title": "Security-guidance plugin (@ClaudeDevs, May 26 2026)",
   "url": "https://x.com/ClaudeDevs/status/2059385239781384341",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": "and [Claude Code security-guidance docs](https://code.claude.com/docs/en/security-guidance) - hook-based plugin, three review levels (file edits / model turns / commits), \"30-40% decrease in security-related comments on PRs,\" `claude-securi"
  },
  {
   "date": "2026-05-26",
   "precision": "day",
   "title": "code.claude.com/docs/en/security-guidance",
   "url": "https://code.claude.com/docs/en/security-guidance",
   "type": "docs",
   "harness": [
    "research / general"
   ],
   "layers": [
    2
   ],
   "capabilities": [
    "Execution Security"
   ],
   "established": ""
  },
  {
   "date": "2026-05-27",
   "precision": "day",
   "title": "everything-pr, May 27 2026",
   "url": "https://everything-pr.com/openclaw-hermes-detection-timeline/",
   "type": "web",
   "harness": [
    "OpenClaw"
   ],
   "layers": [
    5
   ],
   "capabilities": [
    "Wont Show - Opacity"
   ],
   "established": ""
  },
  {
   "date": "2026-05-27",
   "precision": "day",
   "title": "explainx coverage flags this explicitly",
   "url": "https://explainx.ai/blog/claude-code-security-guidance-plugin-2026",
   "type": "blog",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Compounding Fixes"
   ],
   "established": ""
  },
  {
   "date": "2026-05-28",
   "precision": "day",
   "title": "Anthropic releases Opus 4.8 with new 'dynamic workflow' tool",
   "url": "https://techcrunch.com/2026/05/28/anthropic-releases-opus-4-8-with-new-dynamic-workflow-tool/",
   "type": "news",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    1
   ],
   "capabilities": [
    "Orchestration Routing"
   ],
   "established": "TechCrunch (Russell Brandom), May 28 2026. Third-party corroboration of the dynamic-workflow launch and the codebase-scale migration framing"
  },
  {
   "date": "2026-05-28",
   "precision": "day",
   "title": "Introducing Claude Opus 4.8",
   "url": "https://www.anthropic.com/news/claude-opus-4-8",
   "type": "release",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    1,
    4
   ],
   "capabilities": [
    "Orchestration Routing",
    "Runtime Evaluation"
   ],
   "established": "Anthropic, May 28 2026. Dynamic workflows ship; \"run hundreds of parallel subagents in a single session ... verifies its outputs\"; \"around four times less likely than its predecessor to allow flaws in code it has written to pass unremarked."
  },
  {
   "date": "2026-05-28",
   "precision": "day",
   "title": "Introducing dynamic workflows in Claude Code",
   "url": "https://claude.com/blog/introducing-dynamic-workflows-in-claude-code",
   "type": "release",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    1,
    3,
    4
   ],
   "capabilities": [
    "Cross-Agent Coherence",
    "Orchestration Routing",
    "Runtime Evaluation"
   ],
   "established": "Claude.com, May 28 2026. \"Some problems are too big for one pass by a single agent\"; \"Claude dynamically writes orchestration scripts that run tens to hundreds of parallel subagents\"; \"the coordination happens outside the conversation, [so]"
  },
  {
   "date": "2026-05-29",
   "precision": "day",
   "title": "Braintrust, turning production failures into regression tests, May 29 2026",
   "url": "https://www.braintrust.dev/articles/turn-llm-production-failures-into-regression-tests",
   "type": "web",
   "harness": [
    "research / general"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Compounding Fixes"
   ],
   "established": ""
  },
  {
   "date": "2026-06-02",
   "precision": "day",
   "title": "A harness for every task",
   "url": "https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code",
   "type": "release",
   "harness": [
    "Claude Code"
   ],
   "layers": [
    4
   ],
   "capabilities": [
    "Runtime Evaluation"
   ],
   "established": "Claude.com (Thariq Shihipar, Sid Bidasaria), Jun 2 2026. Named failure modes: agentic laziness (\"declares the job done after partial progress, for example addressing 35 of the 50 items in a security review\"), self-preferential bias, goal dr"
  }
 ]
};
