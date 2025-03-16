import argparse
import json
import os
from pathlib import Path
import sys
from generate_video import generate_video
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_config(config_path: str = 'config.json') -> dict:
    """Load configuration from JSON file."""
    try:
        with open(config_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Failed to load config: {e}")
        raise

def setup_directories(config: dict):
    """Create necessary directories if they don't exist."""
    for dir_name in [config['storage']['temp_dir'], config['storage']['output_dir']]:
        Path(dir_name).mkdir(parents=True, exist_ok=True)

def test_generation(config: dict, idiom: str, context: str, style_preset: str = 'casual'):
    """Test video generation with sample input."""
    try:
        # Get preset configuration
        preset = config['presets'].get(style_preset, config['presets']['casual'])
        style = preset['style']

        # Combine with default style
        full_style = f"{style}, {config['generation']['default_style']}"

        logger.info(f"Testing video generation for idiom: {idiom}")
        logger.info(f"Context: {context}")
        logger.info(f"Style: {full_style}")

        # Generate video
        output_path = os.path.join(
            config['storage']['output_dir'],
            f"test_{idiom.replace(' ', '_')}.mp4"
        )

        result = generate_video(
            idiom=idiom,
            context=context,
            style=full_style,
            output_path=output_path,
            model_path=config['model']['path'],
            num_frames=preset['num_frames'],
            fps=preset['fps']
        )

        logger.info(f"Video generated successfully: {result}")
        return result

    except Exception as e:
        logger.error(f"Test generation failed: {e}")
        raise

def main():
    parser = argparse.ArgumentParser(description="Test video generation setup")
    parser.add_argument("--idiom", type=str, default="on the ball",
                      help="Idiom to visualize")
    parser.add_argument("--context", type=str, 
                      default="A person quickly responding to challenges in a business meeting",
                      help="Context for the idiom")
    parser.add_argument("--style", type=str, default="casual",
                      choices=['casual', 'professional', 'educational'],
                      help="Style preset to use")
    parser.add_argument("--config", type=str, default="config.json",
                      help="Path to config file")

    args = parser.parse_args()

    try:
        # Load configuration
        config = load_config(args.config)

        # Setup directories
        setup_directories(config)

        # Run test generation
        result = test_generation(
            config=config,
            idiom=args.idiom,
            context=args.context,
            style_preset=args.style
        )

        logger.info("Test completed successfully!")
        logger.info(f"Output video: {result}")

    except Exception as e:
        logger.error(f"Test failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()