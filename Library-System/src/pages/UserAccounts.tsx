import React from 'react'
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";



function UserAccounts() {
  return (
    <div className="container mx-auto py-10 px-4">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Activity Overview</h1>
                <p className="text-muted-foreground"> Monitor user accounts activities.</p>
            </div>
        </div>

        {/* Search Bar */}
      {/* <div className="flex items-center gap-2 mb-6 bg-muted p-3 rounded-lg border border-border shadow-sm w-full md:w-1/3">
        <Search className="text-muted-foreground" size={20} />
        <Input
          className="border-0 focus-visible:ring-0 text-base bg-transparent"
          placeholder="Search books or members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>*/}
    </div> 
    
  )
}

export default UserAccounts
