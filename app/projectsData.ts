export type Project = {
  slug: string;
  title: string;
  oneLiner: string;               // card summary on the home page
  status: "completed" | "in progress";
  featured?: boolean;
  repo?: string;
  href?: string;
  media?: string;
  problem: string;                // why this matters, 1–2 sentences
  built: string[];                // 3–4 verb-first bullets
  decisions: { choice: string; why: string }[];   // 2–3 judgment calls
  results?: { value: string; label: string }[];   // metric tiles, once you have them
  milestones?: { label: string; done: boolean }[]; // shown while in progress
  tech: string[];
};

export const projects: Project[] = [
  {
    slug: "mot3d",
    title: "MOT3D: Real-Time 3D Multi-Object Tracking",
    oneLiner:
      "C++17 tracking-by-detection on nuScenes: an EKF with a CTRV motion model, hand-written Hungarian association, and official nuScenes tracking metrics.",
    status: "in progress",
    featured: true,
    repo: "https://github.com/Moin-Palekar/mot3d-nuscenes",
    problem:
      "A self-driving car must know not just what is around it, but which object is which from one moment to the next. A pedestrian who disappears behind a truck has to come back as the same pedestrian, or prediction and planning fail.",
    built: [
      "Implemented a 6-state CTRV extended Kalman filter, with a constant-velocity model behind the same interface for comparison",
      "Wrote the Hungarian assignment solver from scratch, with per-class gating on Mahalanobis, 3D IoU and center-distance costs",
      "Built a tentative → confirmed → dead track lifecycle with per-class birth and death thresholds",
      "Wired the pipeline end to end: SE(3) transforms, a nuScenes submission writer, official AMOTA scoring, and a ROS 2 node for rviz2",
    ],
    decisions: [
      {
        choice: "Hand-written Hungarian solver instead of a library",
        why: "Association is the core of the tracker, so owning it makes cost gating and profiling transparent.",
      },
      {
        choice: "ROS-free core library",
        why: "The tracker is tested and benchmarked in plain C++; ROS 2 is a thin wrapper, so it ports to any stack.",
      },
      {
        choice: "Reproduce a published baseline before adding anything",
        why: "Every later change is measured against a trusted number, and every reported figure traces to a command.",
      },
    ],
    milestones: [
      { label: "Skeleton, Docker and CI", done: false },
      { label: "Data layer and transforms", done: false },
      { label: "Tracker core with tests", done: false },
      { label: "First AMOTA score", done: false },
      { label: "Six-configuration ablation", done: false },
      { label: "Latency profiling and optimization", done: false },
      { label: "ROS 2 node and rviz2 visuals", done: false },
    ],
    tech: ["C++17", "EKF / CTRV", "Hungarian", "nuScenes", "ROS 2", "CMake", "CI"],
  },
  {
    slug: "transfuser-navsim",
    title: "TransFuser on NAVSIM",
    oneLiner:
      "Reproducing an end-to-end driving policy that fuses camera and LiDAR in bird's-eye view, trained on multiple GPUs on ASU's Sol cluster via SLURM.",
    status: "in progress",
    featured: true,
    repo: "https://github.com/Moin-Palekar/navsim-transfuser",
    problem:
      "End-to-end driving models map raw sensors straight to a plan, but published results are hard to reproduce. Without a verified baseline, no improvement can be trusted.",
    built: [
      "Set up the NAVSIM benchmark pipeline and verified it against the official checkpoints and published scores",
      "Reproduced TransFuser's camera and LiDAR fusion in a shared bird's-eye-view representation",
      "Scaled training across multiple GPUs on ASU's Sol HPC cluster with SLURM job scheduling",
    ],
    decisions: [
      {
        choice: "Verify the pipeline with official checkpoints before training",
        why: "It separates evaluation bugs from training bugs, so a mismatch has exactly one place to look.",
      },
      {
        choice: "Multi-GPU training on a shared cluster",
        why: "Full-scale training is the only way to match published numbers rather than a scaled-down approximation.",
      },
    ],
    milestones: [
      { label: "Pipeline verified against official checkpoints", done: false },
      { label: "Single-GPU training run", done: false },
      { label: "Multi-GPU training on Sol", done: false },
      { label: "Match published PDM score", done: false },
    ],
    tech: ["PyTorch", "Sensor fusion", "BEV", "NAVSIM", "SLURM", "Multi-GPU"],
  },
  {
    slug: "navstack",
    title: "navstack: Autonomous Robot Navigation",
    oneLiner:
      "A full navigation stack for a differential-drive robot: EKF localization, occupancy grid mapping, hybrid A* planning and DWA control.",
    status: "in progress",
    featured: true,
    repo: "https://github.com/Moin-Palekar/navstack",
    problem:
      "A mobile robot has to answer four questions continuously: where am I, what's around me, how do I get there, and how do I move right now. An error in any one shows up in all the others.",
    built: [
      "Implemented EKF localization fusing odometry and sensor measurements",
      "Built occupancy grid mapping of the robot's surroundings",
      "Implemented hybrid A* for kinematically feasible global paths",
      "Implemented a dynamic window approach (DWA) local controller, integrated with ROS 2 and Nav2 in Gazebo",
    ],
    decisions: [
      {
        choice: "Hybrid A* instead of grid A*",
        why: "A differential-drive robot can't turn in place along any path; hybrid A* plans only paths it can actually drive.",
      },
      {
        choice: "Each module built and tested in simulation first",
        why: "Gazebo makes failures reproducible, so localization, mapping, planning and control can be debugged one at a time.",
      },
    ],
    milestones: [
      { label: "EKF localization", done: false },
      { label: "Occupancy grid mapping", done: false },
      { label: "Hybrid A* global planner", done: false },
      { label: "DWA local controller", done: false },
      { label: "Closed-loop navigation in Gazebo", done: false },
    ],
    tech: ["ROS 2", "Nav2", "Gazebo", "EKF", "Hybrid A*", "DWA"],
  },
  {
    slug: "ragserve",
    title: "ragserve: Retrieval-Augmented Generation Service",
    oneLiner:
      "A retrieval + generation service built on FastAPI and pgvector, with ONNX-optimized inference, deployed on Kubernetes.",
    status: "in progress",
    featured: true,
    repo: "https://github.com/Moin-Palekar/ragserve",
    problem:
      "Language models answer confidently even when they're wrong. Grounding every answer in retrieved documents makes it traceable, but only if retrieval and inference are fast enough to serve real traffic.",
    built: [
      "Built a FastAPI service that retrieves relevant documents before generating an answer",
      "Stored embeddings in PostgreSQL with pgvector for similarity search",
      "Exported models to ONNX for faster inference",
      "Containerized the service and deployed it on Kubernetes",
    ],
    decisions: [
      {
        choice: "pgvector instead of a dedicated vector database",
        why: "Vectors and metadata live in one Postgres instance, which means one system to run, back up and query.",
      },
      {
        choice: "ONNX-exported inference",
        why: "It cuts latency and decouples the serving runtime from the training framework.",
      },
    ],
    milestones: [
      { label: "Retrieval with pgvector", done: false },
      { label: "Generation endpoint", done: false },
      { label: "ONNX inference", done: false },
      { label: "Kubernetes deployment", done: false },
      { label: "Latency and retrieval-quality benchmarks", done: false },
    ],
    tech: ["Python", "FastAPI", "pgvector", "ONNX Runtime", "Kubernetes"],
  },
  {
    slug: "taskq",
    title: "taskq: Distributed Job Queue",
    oneLiner:
      "A distributed job queue in Go, backed by PostgreSQL and Redis and deployed on Kubernetes.",
    status: "in progress",
    repo: "https://github.com/Moin-Palekar/taskq",
    problem:
      "Background work like emails, reports and data pipelines must run exactly once, even when workers crash mid-job or the network drops. Losing or duplicating a job is a real production incident.",
    built: [
      "Built a job queue in Go that distributes work across concurrent workers",
      "Used PostgreSQL as the durable record of every job and its state",
      "Used Redis for fast coordination between workers",
      "Deployed the system on Kubernetes",
    ],
    decisions: [
      {
        choice: "Postgres for durability, Redis for speed",
        why: "Each store does what it's best at: Postgres guarantees no job is lost, and Redis keeps scheduling fast.",
      },
      {
        choice: "Go for the workers",
        why: "Goroutines make many concurrent workers cheap, and a single static binary simplifies deployment.",
      },
    ],
    milestones: [
      { label: "Enqueue and dequeue API", done: false },
      { label: "Durable job state in Postgres", done: false },
      { label: "Retries and crash recovery", done: false },
      { label: "Kubernetes deployment", done: false },
      { label: "Throughput benchmarks", done: false },
    ],
    tech: ["Go", "PostgreSQL", "Redis", "Kubernetes"],
  },
  {
    slug: "personal-website",
    title: "moinpalekar.com",
    oneLiner:
      "This site: a Next.js and TypeScript frontend on Vercel, an Express and MongoDB API on Render, JWT auth, and a Markdown + LaTeX blog engine.",
    status: "completed",
    repo: "https://github.com/Moin-Palekar/personal-website",
    problem:
      "A portfolio should prove engineering skill, not just describe it. That means real authentication, a real API, and a publishing workflow, not a static template.",
    built: [
      "Built a Next.js and TypeScript frontend deployed on Vercel",
      "Built an Express and MongoDB API on Render, with JWT authentication guarding admin-only publishing",
      "Wrote a Markdown renderer with KaTeX math and syntax highlighting, accepting LaTeX pasted from Overleaf",
      "Designed a custom canvas animation of cosmic history for the navigation bar",
    ],
    decisions: [
      {
        choice: "Separate frontend and API hosts",
        why: "Each scales and deploys independently, mirroring how production systems are split.",
      },
      {
        choice: "Registration closed by default",
        why: "Only the owner can publish, enforced on the server rather than hidden in the UI.",
      },
    ],
    tech: ["Next.js", "TypeScript", "Express", "MongoDB", "Tailwind", "JWT"],
  },
];