import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { formatRupee } from '../../utils/fees';

const ProgramCard = ({ program }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card flex h-full flex-col overflow-hidden p-8 bg-white border border-purple/5 shadow-soft hover:shadow-hover hover:border-purple/20 transition-all rounded-3xl"
    >
      {/* 1. Program Name */}
      <h3 className="mb-6 text-3xl font-bold text-charcoal">{program.name}</h3>
      
      {/* 2. Age Range + Stage */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <p className="text-xs font-bold tracking-widest text-charcoal/50 uppercase mb-1">Age</p>
          <p className="font-bold text-lg text-purple">{program.ageRange} YEARS</p>
        </div>
        {program.stage && (
          <div>
            <p className="text-xs font-bold tracking-widest text-charcoal/50 uppercase mb-1">Stage</p>
            <p className="font-bold text-lg text-purple">{program.stage}</p>
          </div>
        )}
      </div>
      
      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {/* Fees */}
            {program.fees && (program.fees.threeMonths || program.fees.sixMonths || program.fees.twelveMonths || program.fees.sibling) && (
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest text-charcoal/50 uppercase mb-3">Fees & Packages</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {program.fees.threeMonths && (
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
                      <p className="text-xs font-bold text-charcoal/60 uppercase mb-1">3 Months</p>
                      <p className="font-bold text-purple">{formatRupee(program.fees.threeMonths)}</p>
                    </div>
                  )}
                  {program.fees.sixMonths && (
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
                      <p className="text-xs font-bold text-charcoal/60 uppercase mb-1">6 Months</p>
                      <p className="font-bold text-purple">{formatRupee(program.fees.sixMonths)}</p>
                    </div>
                  )}
                  {program.fees.twelveMonths && (
                    <div className="rounded-xl border border-turquoise/20 bg-turquoise/5 p-3 text-center">
                      <p className="text-xs font-bold text-charcoal/60 uppercase mb-1">12 Months</p>
                      <p className="font-bold text-turquoise">{formatRupee(program.fees.twelveMonths)}</p>
                    </div>
                  )}
                  {program.fees.sibling && (
                    <div className="rounded-xl border border-purple/10 bg-purple/5 p-3 text-center">
                      <p className="text-xs font-bold text-charcoal/60 uppercase mb-1">Sibling</p>
                      <p className="font-bold text-purple">{formatRupee(program.fees.sibling)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Short Objective */}
            {program.shortObjective && (
              <p className="text-lg font-medium text-charcoal mb-6 border-l-2 border-turquoise pl-4">
                {program.shortObjective}
              </p>
            )}

            {/* 4. Full Description */}
            {program.description && (
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest text-charcoal/50 uppercase mb-3">About This Program</p>
                <p className="text-charcoal/80 leading-relaxed text-base">
                  {program.description}
                </p>
              </div>
            )}
            
            {/* 5. Objectives */}
            {program.objectives && program.objectives.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest text-charcoal/50 uppercase mb-4">What Children Work On</p>
                <ul className="space-y-3">
                  {program.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-charcoal/80 text-base">
                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-purple/10 text-purple">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Read More Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-auto pt-6 flex items-center gap-2 text-purple font-bold hover:text-purple-dark transition-colors"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
    </motion.div>
  );
};

export default ProgramCard;
