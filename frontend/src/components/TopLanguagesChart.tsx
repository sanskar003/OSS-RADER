import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { GithubTopLanguage } from "@/types/GithubTopLanguage.types";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";


type Props = {
  languages: GithubTopLanguage[];
};


const chartConfig = {
  percentage: {
    label: "Usage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;


export default function TopLanguagesChart({ languages }: Props) {

  const totalBytes = languages.reduce(
    (sum, lang) => sum + lang.bytes,
    0
  );


  const chartData = languages
    .slice(0, 5)
    .map((lang) => ({
      name: lang.language,
      percentage: Math.round(
        (lang.bytes / totalBytes) * 100
      ),
    }));


  return (
    <ChartContainer
      config={chartConfig}
      className="font-sans font-semibold h-[300px] min-w-1/2 rounded-xl border p-2"
    >
      <BarChart
        data={chartData}
        layout="vertical">

        <CartesianGrid
          horizontal={false}
          vertical={false} />

        <XAxis
          type="number"
          hide />

        <YAxis
          dataKey="name"
          type="category"
          width={90}
          axisLine={false}
          tickLine={false} />

        <Bar
          dataKey="percentage"
          fill="var(--color-percentage)"
          radius={5}
          barSize={40}
          animationDuration={800}>
          <LabelList
            fill="black"
            dataKey="percentage"
            position="right"
            formatter={(value) => `${value}%`}
          />
        </Bar>

      </BarChart>
    </ChartContainer>
  );
}