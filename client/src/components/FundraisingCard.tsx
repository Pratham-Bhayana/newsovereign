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
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
          <User className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#1A3C4A]">{campaign.name}</h3>
          <p className="text-xs text-gray-500">{campaign.program}</p>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {campaign.story}
      </p>
      
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>
            {campaign.currency === 'USD' ? '$' : '€'}
            {campaign.currentAmount.toLocaleString()} / {campaign.currency === 'USD' ? '$' : '€'}
            {campaign.targetAmount.toLocaleString()}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-1.5 bg-gray-200" />
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {Math.round(progressPercentage)}% funded • {campaign.daysLeft} days left
        </span>
        <Button className="bg-[#183b4e] text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-[#00A89A] transition">
          Support
        </Button>
      </div>
    </div>
  );
}