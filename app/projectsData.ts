export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  tech: string[];
  status: "completed" | "in progress";
  featured?: boolean;
  href?: string;
  repo?: string;
  media?: string;
  description: string;
  challenges: string;
}

export const projects: Project[] = [
  {
    slug: "mot3d",
    title: "MOT3D: Real-Time 3D Multi-Object Tracking",
    oneLiner:
      "C++17 tracking-by-detection on nuScenes: an EKF with a CTRV motion model, hand-written Hungarian association, and official nuScenes tracking metrics.",
    tech: ["C++17", "EKF / CTRV", "Hungarian", "nuScenes", "ROS 2", "CMake", "CI"],
    status: "in progress",
    featured: true,
    repo: "https://github.com/Moin-Palekar/mot3d-nuscenes",
    description:
      "Tracks vehicles, pedestrians and cyclists across frames from CenterPoint detections. The core library covers SE(3) geometry, a 6-state CTRV extended Kalman filter, per-class gating with Mahalanobis and 3D-IoU costs, and a tentative/confirmed/dead track lifecycle, with no ROS dependency. A separate ROS 2 package wraps it for visualization.",
    challenges:
      "Reproducing a published tracker baseline within a stated margin, then ablating motion model, cost function and per-class parameters, and profiling per-stage latency before and after optimization.",
  },
  {
    slug: "transfuser-navsim",
    title: "TransFuser on NAVSIM",
    oneLiner:
      "Reproducing an end-to-end driving policy that fuses camera and LiDAR in bird's-eye view, trained on multiple GPUs on ASU's Sol cluster via SLURM.",
    tech: ["PyTorch", "Sensor fusion", "BEV", "NAVSIM", "SLURM", "Multi-GPU"],
    status: "in progress",
    featured: true,
    repo: "https://github.com/Moin-Palekar/navsim-transfuser",
    description:
      "A reproduction of TransFuser on the NAVSIM benchmark, verifying the pipeline against official checkpoints and published numbers before scaling training across GPUs on an HPC cluster.",
    challenges:
      "Matching published results so later changes can be measured against a trusted baseline, and running distributed training on shared cluster infrastructure.",
  },
  {
    slug: "navstack",
    title: "navstack: Autonomous Robot Navigation",
    oneLiner:
      "A full navigation stack for a differential-drive robot: EKF localization, occupancy grid mapping, hybrid A* planning and DWA control.",
    tech: ["ROS 2", "Nav2", "Gazebo", "EKF", "Hybrid A*", "DWA"],
    status: "in progress",
    featured: true,
    repo: "https://github.com/Moin-Palekar/navstack",
    description:
      "Covers the whole autonomy loop in simulation: estimating the robot's pose, building a map of its surroundings, planning kinematically feasible paths, and tracking them with a local controller.",
    challenges:
      "Making localization, mapping, planning and control work together as one closed loop, where an error in any stage shows up downstream.",
  },
  {
    slug: "ragserve",
    title: "ragserve: Retrieval-Augmented Generation Service",
    oneLiner:
      "A retrieval + generation service built on FastAPI and pgvector, with ONNX-optimized inference, deployed on Kubernetes.",
    tech: ["Python", "FastAPI", "pgvector", "ONNX Runtime", "Kubernetes"],
    status: "in progress",
    featured: true,
    repo: "https://github.com/Moin-Palekar/ragserve",
    description:
      "Serves answers grounded in retrieved documents: embeddings stored in Postgres via pgvector, model inference exported to ONNX for speed, and the service containerized for Kubernetes.",
    challenges:
      "Keeping retrieval and inference latency low enough for interactive use while running on standard infrastructure.",
  },
  {
    slug: "taskq",
    title: "taskq: Distributed Job Queue",
    oneLiner:
      "A distributed job queue in Go, backed by PostgreSQL and Redis and deployed on Kubernetes.",
    tech: ["Go", "PostgreSQL", "Redis", "Kubernetes"],
    status: "in progress",
    repo: "https://github.com/Moin-Palekar/taskq",
    description:
      "Accepts jobs, distributes them across workers, and tracks their state, with PostgreSQL as the durable store and Redis for fast coordination.",
    challenges:
      "Guaranteeing jobs are neither lost nor run twice when workers crash or the network partitions.",
  },
  {
    slug: "personal-website",
    title: "moinpalekar.com",
    oneLiner:
      "This site: a Next.js and TypeScript frontend on Vercel, an Express and MongoDB API on Render, JWT auth, and a Markdown + LaTeX blog engine.",
    tech: ["Next.js", "TypeScript", "Express", "MongoDB", "Tailwind", "JWT"],
    status: "completed",
    repo: "https://github.com/Moin-Palekar/personal-website",
    description:
      "A full-stack personal site with an authenticated publishing flow. Posts are written in Markdown with KaTeX-rendered equations and stored in MongoDB Atlas.",
    challenges:
      "Splitting the frontend and API across two hosts, securing the admin-only publishing routes, and rendering math-heavy posts cleanly.",
  },
];