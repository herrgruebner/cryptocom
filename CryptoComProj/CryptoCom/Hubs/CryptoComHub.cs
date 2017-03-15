using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using System.Web;
using System.Diagnostics;

namespace CryptoCom.Hubs
{
    public class CryptoComHub : Hub
    {
        public CryptoComHub()
        {

        }

        public void Send(string name, List<int> message)
        {
            Debug.WriteLine(message);
            // Call the addNewMessageToPage method to update clients.
            Clients.Others.addNewMessageToPage(name, message);
        }
    }
}