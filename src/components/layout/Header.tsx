import { motion } from "framer-motion";

export default function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="md:hidden w-full bg-white shadow p-4 flex justify-between items-center"
    >
      <button
        onClick={onMenu}
        className="p-2 bg-gray-100 rounded text-xl"
      >
        ☰
      </button>

      <h1 className="text-primary font-bold text-lg">
        AI DCF
      </h1>

      <div className="w-8" />
    </motion.header>
  );
}
