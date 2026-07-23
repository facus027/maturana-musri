/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {

      colors: {
        maturana: {
          beige: "#f4f0ed",
          navy: "#0f2940",
          blue: "#193957",
          ochre: "#d9b995",
        },
      },

      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        lato: ['"Lato"', "sans-serif"],
      },

      maxWidth: {
        content: "1280px",
        text: "760px",
      },

      boxShadow: {
        card: "0 10px 30px rgba(15, 41, 64, 0.08)",
        elevated: "0 18px 45px rgba(15, 41, 64, 0.14)",
      },

      backgroundImage: {
        "maturana-gradient":
          "linear-gradient(135deg, #0f2940 0%, #193957 100%)",
      },

      transitionTimingFunction: {
        elegant: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        fadeDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        slideLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },

        slideRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(-40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },

        slowZoom: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.06)",
          },
        },
      },

      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-down":
          "fadeDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-left":
          "slideLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-right":
          "slideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slow-zoom": "slowZoom 12s ease-in-out infinite alternate",
      },
      
    },

  },

  plugins: [],
}

