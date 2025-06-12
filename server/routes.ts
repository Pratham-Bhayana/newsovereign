import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertConsultationSchema, 
  insertContactSchema, 
  insertFundraisingCampaignSchema,
  insertContributionSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Consultation routes
  app.post("/api/consultations", async (req, res) => {
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

  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getConsultations();
      res.json({ success: true, data: consultations });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch consultations" });
    }
  });

  app.get("/api/consultations/:id", async (req, res) => {
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

  // Contact routes
  app.post("/api/contacts", async (req, res) => {
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

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch contacts" });
    }
  });

  // Fundraising campaign routes
  app.get("/api/fundraising-campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getFundraisingCampaigns();
      res.json({ success: true, data: campaigns });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch fundraising campaigns" });
    }
  });

  app.get("/api/fundraising-campaigns/:id", async (req, res) => {
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

  app.post("/api/fundraising-campaigns", async (req, res) => {
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

  // Contribution routes
  app.post("/api/contributions", async (req, res) => {
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

  app.get("/api/contributions/campaign/:campaignId", async (req, res) => {
    try {
      const campaignId = parseInt(req.params.campaignId);
      const contributions = await storage.getContributionsByCampaign(campaignId);
      res.json({ success: true, data: contributions });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch contributions" });
    }
  });

  app.get("/api/contributors/top", async (req, res) => {
    try {
      const topContributors = await storage.getTopContributors();
      res.json({ success: true, data: topContributors });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch top contributors" });
    }
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "API is healthy" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
