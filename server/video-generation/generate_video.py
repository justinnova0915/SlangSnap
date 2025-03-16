import sys
import os
import argparse
import torch
from pathlib import Path
from PIL import Image
import numpy as np
import logging

# Add SGM module to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sgm_path = os.path.join(current_dir, '..', 'server', 'video-generation', 'sgm')
if os.path.exists(sgm_path):
    sys.path.append(sgm_path)
    print(f"Added SGM path: {sgm_path}")
else:
    raise ImportError(f"SGM module not found at {sgm_path}")

from sgm.inference.helpers import initialize_model
from sgm.inference.api import ImageToVideoGenerator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_model(model_path: str):
    """Load the SVD model."""
    try:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = initialize_model(model_path, device)
        return model, device
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        raise

def generate_video(
    idiom: str,
    context: str,
    style: str,
    output_path: str,
    model_path: str = "models/svd_xt.safetensors",
    num_frames: int = 14,
    fps: int = 7
):
    """Generate a video from text description."""
    try:
        # Load model
        model, device = load_model(model_path)
        generator = ImageToVideoGenerator(model, device)

        # Combine inputs into a prompt
        prompt = f"A scene showing the idiom '{idiom}': {context}. Style: {style}"
        logger.info(f"Generating video with prompt: {prompt}")

        # Generate base frame using the model
        base_output = generator.generate_from_prompt(
            prompt,
            num_frames=num_frames,
            fps=fps,
            decode_chunk_size=4
        )

        # Save video
        output_path = Path(output_path)
        generator.save_video(base_output, str(output_path))
        logger.info(f"Video saved to {output_path}")

        return str(output_path)

    except Exception as e:
        logger.error(f"Video generation failed: {e}")
        raise

def main():
    parser = argparse.ArgumentParser(description="Generate video from idiom description")
    parser.add_argument("--idiom", type=str, required=True, help="The idiom to visualize")
    parser.add_argument("--context", type=str, required=True, help="Context for the idiom")
    parser.add_argument("--style", type=str, required=True, help="Visual style")
    parser.add_argument("--output", type=str, required=True, help="Output path for video")
    parser.add_argument("--model-path", type=str, default="models/svd_xt.safetensors",
                      help="Path to the model weights")
    parser.add_argument("--num-frames", type=int, default=14,
                      help="Number of frames to generate")
    parser.add_argument("--fps", type=int, default=7,
                      help="Frames per second for the output video")

    args = parser.parse_args()

    try:
        generate_video(
            idiom=args.idiom,
            context=args.context,
            style=args.style,
            output_path=args.output,
            model_path=args.model_path,
            num_frames=args.num_frames,
            fps=args.fps
        )
    except Exception as e:
        logger.error(f"Failed to generate video: {e}")
        exit(1)

if __name__ == "__main__":
    main()