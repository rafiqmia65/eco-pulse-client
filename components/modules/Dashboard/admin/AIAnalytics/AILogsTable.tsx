"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertOctagon,
  Calendar,
  Clock,
  Code,
  CornerDownRight,
  Eye,
  FileText,
  Terminal,
  User,
  X,
} from "lucide-react";
import { IAILogItem } from "@/types/adminTypes/adminAIStats.types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AILogsTableProps {
  recentLogs: IAILogItem[];
  errorLogs: IAILogItem[];
}

const AILogsTable = ({ recentLogs, errorLogs }: AILogsTableProps) => {
  const [activeTab, setActiveTab] = useState<"recent" | "errors">("recent");
  const [selectedLog, setSelectedLog] = useState<IAILogItem | null>(null);

  const logs = activeTab === "recent" ? recentLogs : errorLogs;

  // Format date nicely
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } catch {
      return dateStr;
    }
  };

  // Get status class for badge
  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    }
    if (status >= 300 && status < 400) {
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
    return "bg-rose-500/10 text-rose-500 border-rose-500/20";
  };

  // Get latency text color
  const getLatencyColor = (ms: number) => {
    if (ms < 1000) return "text-emerald-500 font-medium";
    if (ms < 3500) return "text-amber-500 font-medium";
    return "text-rose-500 font-bold";
  };

  // Get feature badge style
  const getFeatureBadge = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "chat":
      case "chat_stream":
      case "chat-stream":
        return "bg-violet-500/10 text-violet-500 border-violet-500/20";
      case "predict-score":
      case "predict_score":
      case "prediction":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "generate-content":
      case "generate_content":
      case "generation":
        return "bg-teal-500/10 text-teal-500 border-teal-500/20";
      default:
        return "bg-muted text-muted-foreground border-border/40";
    }
  };

  const formatFeatureName = (name: string) => {
    return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Card className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xs shadow-xs overflow-hidden flex flex-col justify-between h-full">
      <CardHeader className="pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            AI Query Activity Logs
          </CardTitle>
          <CardDescription>
            Audit individual API logs, response parameters, tokens, and errors.
          </CardDescription>
        </div>

        {/* Audit Tab Selector */}
        <div className="flex bg-muted/60 p-1 rounded-xl border border-border/20 self-start md:self-center">
          <button
            onClick={() => setActiveTab("recent")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-95 duration-200 cursor-pointer",
              activeTab === "recent"
                ? "bg-background text-foreground shadow-xs border border-border/10"
                : "text-muted-foreground hover:text-foreground hover:bg-background/20"
            )}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Recent logs ({recentLogs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("errors")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-95 duration-200 cursor-pointer",
              activeTab === "errors"
                ? "bg-rose-500/10 text-rose-500 border border-rose-500/10 shadow-xs"
                : "text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5"
            )}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Errors ({errorLogs.length})</span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col min-h-[350px]">
        {logs && logs.length > 0 ? (
          <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[460px] scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-border/30 bg-muted/20 text-[10px] uppercase font-bold tracking-wider text-muted-foreground/80 sticky top-0 backdrop-blur-xs z-10">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4 text-center">Tokens</th>
                  <th className="py-3 px-4 text-center">Speed</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 text-xs">
                {logs.map((log) => {
                  const hasUser = !!log.user;
                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-muted/20 transition-all duration-150 group"
                    >
                      {/* Timestamp */}
                      <td className="py-2.5 px-4 font-mono text-[11px] text-muted-foreground/90 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-muted-foreground/50" />
                          {formatDate(log.createdAt)}
                        </div>
                      </td>

                      {/* Feature Badge */}
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-tight",
                            getFeatureBadge(log.type)
                          )}
                        >
                          {formatFeatureName(log.type)}
                        </span>
                      </td>

                      {/* User Profile */}
                      <td className="py-2.5 px-4 max-w-[150px] truncate">
                        {hasUser ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[9px] font-semibold text-primary uppercase shrink-0">
                              {log.user?.name?.[0] || log.user?.email?.[0] || "U"}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold truncate text-[11px]">
                                {log.user?.name || "Member"}
                              </p>
                              <p className="text-[9px] text-muted-foreground truncate leading-none mt-0.5">
                                {log.user?.email}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground/60 italic text-[10px]">
                            Anonymous User
                          </span>
                        )}
                      </td>

                      {/* Tokens details */}
                      <td className="py-2.5 px-4 text-center font-mono whitespace-nowrap">
                        <div className="flex flex-col items-center leading-none">
                          <span className="font-semibold text-foreground">
                            {log.inputTokens + log.outputTokens}
                          </span>
                          <span className="text-[9px] text-muted-foreground/65 mt-0.5">
                            in: {log.inputTokens} | out: {log.outputTokens}
                          </span>
                        </div>
                      </td>

                      {/* Speed Latency */}
                      <td className="py-2.5 px-4 text-center font-mono whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground/40" />
                          <span className={getLatencyColor(log.latency)}>
                            {log.latency}ms
                          </span>
                        </div>
                      </td>

                      {/* HTTP Status Code */}
                      <td className="py-2.5 px-4 text-center whitespace-nowrap">
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded-md border font-mono font-bold text-[10px]",
                            getStatusBadge(log.status)
                          )}
                        >
                          {log.status}
                        </span>
                      </td>

                      {/* Inspect details button */}
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="h-7 w-7 rounded-lg border border-border/40 bg-card hover:bg-primary/10 hover:text-primary hover:border-primary/30 flex items-center justify-center transition-all cursor-pointer"
                          title="Inspect AI Query Payload"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-muted-foreground">
            <AlertOctagon className="w-8 h-8 mb-2 opacity-55" />
            <p className="text-sm">No activity logs recorded for this period.</p>
          </div>
        )}
      </CardContent>

      {/* Log Detail Modal Inspector (Custom Overlay) */}
      {selectedLog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/30">
              <div className="flex items-center gap-2.5">
                <Code className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    AI Query Audit Inspector
                    <span
                      className={cn(
                        "px-1.5 py-0.2 rounded-md border text-[9px] font-mono",
                        getStatusBadge(selectedLog.status)
                      )}
                    >
                      {selectedLog.status}
                    </span>
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    Log Identifier: <span className="font-mono text-[9px] bg-muted/65 px-1.5 py-0.2 rounded border border-border/30">{selectedLog.id}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="h-8 w-8 rounded-xl border border-border/40 bg-card hover:bg-muted/80 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Modal Scrollable Contents */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 scrollbar-thin text-xs">
              {/* Log Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-muted/35 rounded-xl border border-border/20 font-mono text-[11px]">
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Feature</span>
                  <span className="block font-semibold truncate uppercase">{selectedLog.type.replace(/[-_]/g, " ")}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Latency</span>
                  <span className="block font-semibold text-amber-500">{selectedLog.latency}ms</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Input Tokens</span>
                  <span className="block font-semibold text-violet-500">{selectedLog.inputTokens}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Output Tokens</span>
                  <span className="block font-semibold text-primary">{selectedLog.outputTokens}</span>
                </div>
              </div>

              {/* Audit Details */}
              <div className="space-y-4">
                {/* User details */}
                {selectedLog.user && (
                  <div className="flex items-start gap-2 bg-primary/5 p-3 rounded-xl border border-primary/10">
                    <User className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-xs">Access User Profiles</h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Name: <strong>{selectedLog.user.name || "Member"}</strong> &bull; Email: <strong>{selectedLog.user.email}</strong>
                      </p>
                    </div>
                  </div>
                )}

                {/* Prompts Section */}
                <div className="space-y-1">
                  <h4 className="font-bold text-muted-foreground text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    User Input Prompt
                  </h4>
                  <pre className="p-3 bg-muted/60 border border-border/30 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono text-[11px] max-h-48 text-foreground leading-relaxed">
                    {selectedLog.prompt || <span className="text-muted-foreground/60 italic">No input prompt recorded (Empty or System Action)</span>}
                  </pre>
                </div>

                {/* Response Section */}
                <div className="space-y-1">
                  <h4 className="font-bold text-muted-foreground text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <CornerDownRight className="w-3.5 h-3.5 text-primary" />
                    AI System Generated Response
                  </h4>
                  <pre className="p-3 bg-muted/60 border border-border/30 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono text-[11px] max-h-56 text-foreground leading-relaxed">
                    {selectedLog.response || <span className="text-muted-foreground/60 italic">No generated output recorded (Failure or Stream action)</span>}
                  </pre>
                </div>

                {/* Error message Section (If exists) */}
                {(selectedLog.errorMessage || selectedLog.status >= 400) && (
                  <div className="space-y-1">
                    <h4 className="font-bold text-rose-500 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      Runtime Exception Stacktrace
                    </h4>
                    <pre className="p-3 bg-rose-500/10 border border-rose-500/25 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono text-[11px] text-rose-500 leading-relaxed font-semibold">
                      {selectedLog.errorMessage || `Request failed with HTTP status code ${selectedLog.status}`}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-3 border-t border-border/40 bg-muted/20">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground border border-border/40 font-medium rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
              >
                Dismiss Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AILogsTable;
