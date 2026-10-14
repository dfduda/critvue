/** @type {import('next').NextConfig} */
export default {
  // briefing.eduardadias.online abre direto o formulário do briefing
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: [{ type: "host", value: "briefing.eduardadias.online" }], destination: "/briefing" },
      ],
    };
  },
};
