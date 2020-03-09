using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KLTN.Common.DTO
{
    public class ResultDTO
    {
        public ResultDTO()
        {
            Messages = new List<string>();
        }


        public object Data { get; set; }

        public bool IsSuccess { get; set; }

        public List<string> Messages { get; set; }
    }


}
