import { 
  users, 
  consultations, 
  contacts, 
  fundraisingCampaigns,
  contributions,
  type User, 
  type InsertUser,
  type Consultation,
  type InsertConsultation,
  type Contact,
  type InsertContact,
  type FundraisingCampaign,
  type InsertFundraisingCampaign,
  type Contribution,
  type InsertContribution
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Consultation methods
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultations(): Promise<Consultation[]>;
  getConsultation(id: number): Promise<Consultation | undefined>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // Fundraising methods
  getFundraisingCampaigns(): Promise<FundraisingCampaign[]>;
  getFundraisingCampaign(id: number): Promise<FundraisingCampaign | undefined>;
  createFundraisingCampaign(campaign: InsertFundraisingCampaign): Promise<FundraisingCampaign>;
  updateCampaignAmount(id: number, amount: number): Promise<FundraisingCampaign | undefined>;

  // Contribution methods
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  getContributionsByCampaign(campaignId: number): Promise<Contribution[]>;
  getTopContributors(): Promise<{ name: string; totalAmount: number }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private consultations: Map<number, Consultation>;
  private contacts: Map<number, Contact>;
  private fundraisingCampaigns: Map<number, FundraisingCampaign>;
  private contributions: Map<number, Contribution>;
  private currentUserId: number;
  private currentConsultationId: number;
  private currentContactId: number;
  private currentCampaignId: number;
  private currentContributionId: number;

  constructor() {
    this.users = new Map();
    this.consultations = new Map();
    this.contacts = new Map();
    this.fundraisingCampaigns = new Map();
    this.contributions = new Map();
    this.currentUserId = 1;
    this.currentConsultationId = 1;
    this.currentContactId = 1;
    this.currentCampaignId = 1;
    this.currentContributionId = 1;

    // Initialize with some sample fundraising campaigns
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCampaigns: (InsertFundraisingCampaign & { currentAmount: number })[] = [
      {
        name: "Maria Santos",
        program: "Portugal Golden Visa Program",
        story: "As a single mother of two, I'm working towards securing EU citizenship for my family through Portugal's Golden Visa program. Your support will help us build a better future with access to world-class education and healthcare.",
        currentAmount: 75000,
        targetAmount: 280000,
        currency: "EUR",
        daysLeft: 45
      },
      {
        name: "Ahmed Hassan",
        program: "Dominica Citizenship Program",
        story: "Seeking a second passport for travel freedom and business opportunities. Dominica's citizenship program offers visa-free access to 140+ countries, opening doors for my growing business.",
        currentAmount: 65000,
        targetAmount: 100000,
        currency: "USD",
        daysLeft: 30
      },
      {
        name: "Jennifer Liu",
        program: "Malta Citizenship Program",
        story: "Pursuing EU citizenship through Malta's exceptional program. As an entrepreneur, this will provide access to the European market and secure my family's future in Europe.",
        currentAmount: 350000,
        targetAmount: 690000,
        currency: "EUR",
        daysLeft: 60
      }
    ];

    sampleCampaigns.forEach(campaign => {
      const id = this.currentCampaignId++;
      const campaignData: FundraisingCampaign = {
        id,
        ...campaign,
        status: "active",
        createdAt: new Date()
      };
      this.fundraisingCampaigns.set(id, campaignData);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Consultation methods
  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentConsultationId++;
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values());
  }

  async getConsultation(id: number): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Fundraising methods
  async getFundraisingCampaigns(): Promise<FundraisingCampaign[]> {
    return Array.from(this.fundraisingCampaigns.values());
  }

  async getFundraisingCampaign(id: number): Promise<FundraisingCampaign | undefined> {
    return this.fundraisingCampaigns.get(id);
  }

  async createFundraisingCampaign(insertCampaign: InsertFundraisingCampaign): Promise<FundraisingCampaign> {
    const id = this.currentCampaignId++;
    const campaign: FundraisingCampaign = {
      ...insertCampaign,
      id,
      currentAmount: 0,
      status: "active",
      createdAt: new Date()
    };
    this.fundraisingCampaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaignAmount(id: number, amount: number): Promise<FundraisingCampaign | undefined> {
    const campaign = this.fundraisingCampaigns.get(id);
    if (campaign) {
      campaign.currentAmount = (campaign.currentAmount || 0) + amount;
      this.fundraisingCampaigns.set(id, campaign);
      return campaign;
    }
    return undefined;
  }

  // Contribution methods
  async createContribution(insertContribution: InsertContribution): Promise<Contribution> {
    const id = this.currentContributionId++;
    const contribution: Contribution = {
      ...insertContribution,
      id,
      createdAt: new Date()
    };
    this.contributions.set(id, contribution);

    // Update campaign amount
    if (contribution.campaignId) {
      await this.updateCampaignAmount(contribution.campaignId, contribution.amount);
    }

    return contribution;
  }

  async getContributionsByCampaign(campaignId: number): Promise<Contribution[]> {
    return Array.from(this.contributions.values()).filter(
      contribution => contribution.campaignId === campaignId
    );
  }

  async getTopContributors(): Promise<{ name: string; totalAmount: number }[]> {
    const contributorMap = new Map<string, number>();
    
    Array.from(this.contributions.values()).forEach(contribution => {
      if (!contribution.anonymous) {
        const currentAmount = contributorMap.get(contribution.contributorName) || 0;
        contributorMap.set(contribution.contributorName, currentAmount + contribution.amount);
      }
    });

    return Array.from(contributorMap.entries())
      .map(([name, totalAmount]) => ({ name, totalAmount }))
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 10);
  }
}

export const storage = new MemStorage();
