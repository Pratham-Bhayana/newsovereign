import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FundraisingCampaign {
  id: string;
  name: string;
  program: string;
  story: string;
  currentAmount: number;
  targetAmount: number;
  currency: string;
  daysLeft: number;
}

interface FundraisingCardProps {
  campaign: FundraisingCampaign;
}

export default function FundraisingCard({ campaign }: FundraisingCardProps) {
  const progressPercentage = (campaign.currentAmount / campaign.targetAmount) * 100;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover-lift smooth-transition shadow-lg">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-6">
          <User className="w-8 h-8 text-gray-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{campaign.name}</h3>
          <p className="text-gray-600">{campaign.program}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-6 leading-relaxed">
        {campaign.story}
      </p>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>
            {campaign.currency === 'USD' ? '$' : '€'}
            {campaign.currentAmount.toLocaleString()} / {campaign.currency === 'USD' ? '$' : '€'}
            {campaign.targetAmount.toLocaleString()}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {Math.round(progressPercentage)}% funded • {campaign.daysLeft} days left
        </span>
        <Button className="gold-gradient text-dark hover:shadow-lg smooth-transition">
          Support
        </Button>
      </div>
    </div>
  );
}
