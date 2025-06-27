// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  consultations;
  contacts;
  fundraisingCampaigns;
  contributions;
  currentUserId;
  currentConsultationId;
  currentContactId;
  currentCampaignId;
  currentContributionId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.consultations = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.fundraisingCampaigns = /* @__PURE__ */ new Map();
    this.contributions = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentConsultationId = 1;
    this.currentContactId = 1;
    this.currentCampaignId = 1;
    this.currentContributionId = 1;
    this.initializeSampleData();
  }
  initializeSampleData() {
    const sampleCampaigns = [
      {
        name: "Maria Santos",
        program: "Portugal Golden Visa Program",
        story: "As a single mother of two, I'm working towards securing EU citizenship for my family through Portugal's Golden Visa program. Your support will help us build a better future with access to world-class education and healthcare.",
        currentAmount: 75e3,
        targetAmount: 28e4,
        currency: "EUR",
        daysLeft: 45
      },
      {
        name: "Ahmed Hassan",
        program: "Dominica Citizenship Program",
        story: "Seeking a second passport for travel freedom and business opportunities. Dominica's citizenship program offers visa-free access to 140+ countries, opening doors for my growing business.",
        currentAmount: 65e3,
        targetAmount: 1e5,
        currency: "USD",
        daysLeft: 30
      },
      {
        name: "Jennifer Liu",
        program: "Malta Citizenship Program",
        story: "Pursuing EU citizenship through Malta's exceptional program. As an entrepreneur, this will provide access to the European market and secure my family's future in Europe.",
        currentAmount: 35e4,
        targetAmount: 69e4,
        currency: "EUR",
        daysLeft: 60
      }
    ];
    sampleCampaigns.forEach((campaign) => {
      const id = this.currentCampaignId++;
      const campaignData = {
        id,
        ...campaign,
        status: "active",
        createdAt: /* @__PURE__ */ new Date()
      };
      this.fundraisingCampaigns.set(id, campaignData);
    });
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Consultation methods
  async createConsultation(insertConsultation) {
    const id = this.currentConsultationId++;
    const consultation = {
      ...insertConsultation,
      id,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date(),
      nationality: insertConsultation.nationality || null,
      programInterest: insertConsultation.programInterest || null,
      preferredDate: insertConsultation.preferredDate || null,
      preferredTime: insertConsultation.preferredTime || null,
      budgetRange: insertConsultation.budgetRange || null,
      message: insertConsultation.message || null
    };
    this.consultations.set(id, consultation);
    return consultation;
  }
  async getConsultations() {
    return Array.from(this.consultations.values());
  }
  async getConsultation(id) {
    return this.consultations.get(id);
  }
  // Contact methods
  async createContact(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date(),
      program: insertContact.program || null
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async getContacts() {
    return Array.from(this.contacts.values());
  }
  // Fundraising methods
  async getFundraisingCampaigns() {
    return Array.from(this.fundraisingCampaigns.values());
  }
  async getFundraisingCampaign(id) {
    return this.fundraisingCampaigns.get(id);
  }
  async createFundraisingCampaign(insertCampaign) {
    const id = this.currentCampaignId++;
    const campaign = {
      ...insertCampaign,
      id,
      currentAmount: 0,
      status: "active",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.fundraisingCampaigns.set(id, campaign);
    return campaign;
  }
  async updateCampaignAmount(id, amount) {
    const campaign = this.fundraisingCampaigns.get(id);
    if (campaign) {
      campaign.currentAmount = (campaign.currentAmount || 0) + amount;
      this.fundraisingCampaigns.set(id, campaign);
      return campaign;
    }
    return void 0;
  }
  // Contribution methods
  async createContribution(insertContribution) {
    const id = this.currentContributionId++;
    const contribution = {
      ...insertContribution,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      campaignId: insertContribution.campaignId || null,
      message: insertContribution.message || null,
      anonymous: insertContribution.anonymous || null
    };
    this.contributions.set(id, contribution);
    if (contribution.campaignId) {
      await this.updateCampaignAmount(contribution.campaignId, contribution.amount);
    }
    return contribution;
  }
  async getContributionsByCampaign(campaignId) {
    return Array.from(this.contributions.values()).filter(
      (contribution) => contribution.campaignId === campaignId
    );
  }
  async getTopContributors() {
    const contributorMap = /* @__PURE__ */ new Map();
    Array.from(this.contributions.values()).forEach((contribution) => {
      if (!contribution.anonymous) {
        const currentAmount = contributorMap.get(contribution.contributorName) || 0;
        contributorMap.set(contribution.contributorName, currentAmount + contribution.amount);
      }
    });
    return Array.from(contributorMap.entries()).map(([name, totalAmount]) => ({ name, totalAmount })).sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 10);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  nationality: text("nationality"),
  programInterest: text("program_interest"),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  budgetRange: text("budget_range"),
  message: text("message"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  program: text("program"),
  message: text("message").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});
var fundraisingCampaigns = pgTable("fundraising_campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  program: text("program").notNull(),
  story: text("story").notNull(),
  currentAmount: integer("current_amount").default(0),
  targetAmount: integer("target_amount").notNull(),
  currency: text("currency").notNull(),
  daysLeft: integer("days_left").notNull(),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow()
});
var contributions = pgTable("contributions", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => fundraisingCampaigns.id),
  contributorName: text("contributor_name").notNull(),
  contributorEmail: text("contributor_email").notNull(),
  amount: integer("amount").notNull(),
  message: text("message"),
  anonymous: boolean("anonymous").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  status: true,
  createdAt: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  status: true,
  createdAt: true
});
var insertFundraisingCampaignSchema = createInsertSchema(fundraisingCampaigns).omit({
  id: true,
  currentAmount: true,
  status: true,
  createdAt: true
});
var insertContributionSchema = createInsertSchema(contributions).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/consultations", async (req, res) => {
    try {
      const consultationData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(consultationData);
      res.json({ success: true, data: consultation });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid consultation data", details: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Failed to create consultation" });
      }
    }
  });
  app2.get("/api/consultations", async (req, res) => {
    try {
      const consultations2 = await storage.getConsultations();
      res.json({ success: true, data: consultations2 });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch consultations" });
    }
  });
  app2.get("/api/consultations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const consultation = await storage.getConsultation(id);
      if (!consultation) {
        res.status(404).json({ success: false, error: "Consultation not found" });
        return;
      }
      res.json({ success: true, data: consultation });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch consultation" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, data: contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid contact data", details: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Failed to create contact" });
      }
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      res.json({ success: true, data: contacts2 });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch contacts" });
    }
  });
  app2.get("/api/fundraising-campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getFundraisingCampaigns();
      res.json({ success: true, data: campaigns });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch fundraising campaigns" });
    }
  });
  app2.get("/api/fundraising-campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const campaign = await storage.getFundraisingCampaign(id);
      if (!campaign) {
        res.status(404).json({ success: false, error: "Campaign not found" });
        return;
      }
      res.json({ success: true, data: campaign });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch campaign" });
    }
  });
  app2.post("/api/fundraising-campaigns", async (req, res) => {
    try {
      const campaignData = insertFundraisingCampaignSchema.parse(req.body);
      const campaign = await storage.createFundraisingCampaign(campaignData);
      res.json({ success: true, data: campaign });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid campaign data", details: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Failed to create campaign" });
      }
    }
  });
  app2.post("/api/contributions", async (req, res) => {
    try {
      const contributionData = insertContributionSchema.parse(req.body);
      const contribution = await storage.createContribution(contributionData);
      res.json({ success: true, data: contribution });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid contribution data", details: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Failed to create contribution" });
      }
    }
  });
  app2.get("/api/contributions/campaign/:campaignId", async (req, res) => {
    try {
      const campaignId = parseInt(req.params.campaignId);
      const contributions2 = await storage.getContributionsByCampaign(campaignId);
      res.json({ success: true, data: contributions2 });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch contributions" });
    }
  });
  app2.get("/api/contributors/top", async (req, res) => {
    try {
      const topContributors = await storage.getTopContributors();
      res.json({ success: true, data: topContributors });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch top contributors" });
    }
  });
  app2.get("/api/health", (req, res) => {
    res.json({ success: true, message: "API is healthy" });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay()
  ];
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }
  return defineConfig({
    root: path.resolve(__dirname, "client"),
    // Vite root is /client
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets")
      }
    },
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"]
      }
    }
  });
};

// server/vite.ts
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname2 = path2.dirname(__filename);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(__dirname2, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
